import * as functions from 'firebase-functions';

const admin = require('firebase-admin');
admin.initializeApp();

//[ DELETE REVIEW START ] firestore(data) -> storage(image) -> storage(thumb_image)
exports.deleteReview = functions.firestore
                        .document('ServiceCenterBoard/reviews/contain/{reviewId}')
                        .onDelete((snap, context)=>{
                          const reviewId = context.params.reviewId;
                          //var data = snap.data();
                          //var imageUrl = data.imgSrc;
                          const imgPath = 'reviews/'+reviewId+'.jpg';
                          const bucket = admin.storage().bucket();
                          const reviewImageRef = bucket.file(imgPath);
                          return reviewImageRef.delete()
                                  .then(()=>{
                                    const thumb_imgPath = 'reviews/thumb_'+reviewId+'.jpg';
                                    const thumb_rivewImageRef = bucket.file(thumb_imgPath);
                                    return thumb_rivewImageRef.delte();
                                  });
                        })

//[ DELETE REVIEW END ]

//[ WRITE DEPLOY_POINT START ]
exports.deployPoint = functions.firestore
    .document('point/DEPLOY')
    .onWrite((change, context) => {
      const newDoc = change.after.exists ? change.after.data() : null;
      const oldDoc:any = change.before.data();

      if(!newDoc){
        return;
      }
      const amountPointNum = newDoc.point - oldDoc.point;
      
      const deployPointHistory ={
        change_point : amountPointNum,
        after_total_point : newDoc.point,
        timestamp : new Date().getTime()
      }      


      const db = admin.firestore();
      const rootWalletRef = db.collection('point').doc('root_wallet');
      return rootWalletRef.get()
        .then((doc:any)=>{
          const rootWallet = doc.data();
          rootWalletRef.set({
            point : rootWallet.point + amountPointNum
          }).then((ref:any)=>{
            db.collection('point').doc('logs')
            .collection('deploy_point_history').add(deployPointHistory)
            .then(()=>{ console.log("포인트배포 & 정보저장 성공"); })
          })
        })
        .catch((err:any)=>{
          console.log("root_have_point 포인트 기록 실패 : "+err);
        });
    });
//[ WRITE DEPLOY_POINT END ]

// [ CREATE POINT_TRANSACTION START ]
exports.pointTransaction = functions.firestore
    .document('point/logs/point_transaction/{pttranId}')
    .onCreate((snap,context)=>{
      const newValue:any = snap.data();
      const db = admin.firestore();
      const pttran={
        pttran_id:context.params.pttranId,
        from_uid:newValue.from_uid,
        from_displayName: null,
        to_uid:newValue.to_uid,
        to_displayName: null,
        point: newValue.point,
        timestamp: new Date().getTime(),
      }
      console.log(`pttran JSON = ${JSON.stringify(pttran)}`);
      const batch = db.batch();      
      const getDoc={
        RootInfo:()=>db.doc(`AdminData/ROOT`).get(),
        FromRootWallet:()=>db.doc(`point/root_wallet`).get(),
        FromUserWallet:()=>db.doc(`point/logs/user_point/${pttran.from_uid}`).get(),
        ToUserWallet:()=>db.doc(`point/logs/user_point/${pttran.to_uid}`).get(),
        FromUserInfo:()=>db.doc(`users/${pttran.from_uid}`).get(),
        ToUserInfo:()=>db.doc(`users/${pttran.to_uid}`).get(),
      }
      const promise={
        pttranFailed:()=>snap.ref.delete(),
        pttranUpdate:()=>getDoc.FromUserInfo().then((fromuserInfoSnap:any)=>{
          const fromUser=fromuserInfoSnap.data();
          pttran.from_displayName = (fromUser)?fromUser.displayName:null;
          return getDoc.ToUserInfo().then((touserInfosnap:any)=>{
            if(touserInfosnap.exists){
              const toUser = touserInfosnap.data();
              pttran.to_displayName = toUser.displayName;
            }else{ pttran.to_displayName = pttran.to_uid; }
            return batch.update(snap.ref,pttran);
          })
        }),
        fromRootWalletUpdate:()=>getDoc.FromRootWallet().then((rootWalletDoc:any)=>{
          const changePoint = rootWalletDoc.data().point - newValue.point;
          return batch.update(rootWalletDoc.ref,{point:changePoint});
        }),
        toRootWalletUpdate:()=>getDoc.FromRootWallet().then((rootWalletDoc:any)=>{
          const changePoint = rootWalletDoc.data().point + newValue.point;
          return batch.update(rootWalletDoc.ref,{point:changePoint});
        }),
        fromUserWalletUpdate:()=>getDoc.FromUserWallet().then((walletDoc:any)=>{
          const wallet = walletDoc.data();
          const changePoint:number = wallet.have_point - newValue.point;
          return batch.update(walletDoc.ref,{have_point:changePoint});
        }),
        toUserWalletUpdate:()=>getDoc.ToUserWallet().then((walletSnap:any)=>{
          const wallet = walletSnap.exists? walletSnap.data():null;
          const originalPoint:number = wallet?wallet.have_point?wallet.have_point:0:0;
          const changePoint:number = Number(newValue.point) + Number(originalPoint);
          return batch.update(walletSnap.ref,{have_point:changePoint});
        }),
      }
      return getDoc.RootInfo().then((rootDoc:any)=>{
        const root = rootDoc.data();
        if(root.master_uid===newValue.from_uid)
          return promise.fromRootWalletUpdate().then(()=>(pttran.to_uid==='root')?promise.toRootWalletUpdate():promise.toUserWalletUpdate());
        else
          return promise.fromUserWalletUpdate().then(()=>(pttran.to_uid==='root')?promise.toRootWalletUpdate():promise.toUserWalletUpdate());  
        })
        .then(()=>promise.pttranUpdate())
        .then(()=>batch.commit().then(()=>{ console.log('정상적으로 point transaction 성공되었습니다.'); }))
        .catch((err:any)=>promise.pttranFailed().then(()=>{ console.log('point transaction 실패 : '+err); }))
    });
// [ CREATE POINT_TRANSACTION END ]


// [ CREATE SALES_CHANNELS START ]
exports.CreateSalesChannels = functions.firestore
    .document(`SalesChannels/{salesChannel_id}`)
    .onCreate((snap,context)=>snap.ref.set({
      salesChannel_id:context.params.salesChannel_id,
      create_timestamp: new Date().getTime()
    },{merge:true}))
// [ CREATE SALES_CHANNELS END ]

// [ CREATE CreateServiceCenterEvent START ]
exports.CreateServiceCenterEvent = functions.firestore
.document(`/ServiceCenterBoard/events/contain/{event_id}`)
.onCreate((snap,context)=>snap.ref.set({
  id:context.params.event_id,
  create_timestamp: new Date().getTime()
},{merge:true}))
// [ CREATE CreateServiceCenterEvent END ]

// [ CREATE SINGLE PRODUCT START ]
exports.createSingleProduct = functions.firestore
.document(`Products/Components/Singles/{single_id}`)
.onCreate((snap,context)=>snap.ref.set({
  single_id:context.params.single_id,
  create_timestamp: new Date().getTime()
},{merge:true}));
// [ CREATE SINGLE PRODUCT END ]

// [ CREATE PACKAGE PRODUCT START ]
exports.createPackageProduct = functions.firestore
.document(`Products/Components/Packages/{package_id}`)
.onCreate((snap,context)=>snap.ref.set({
  package_id:context.params.package_id,
  create_timestamp: new Date().getTime()
},{merge:true}));
// [ CREATE PACKAGE PRODUCT END ]

// [ CREATE PACKAGE GUIDE START ]
exports.createPackageGuide = functions.firestore
.document(`Products/Guide/PackageGuides/{packageGuide_id}`)
.onCreate((snap,context)=>snap.ref.set({
  packageGuide_id:context.params.packageGuide_id,
  create_timestamp: new Date().getTime()
},{merge:true}));
// [ CREATE PACKAGE GUIDE END ]

// [ CREATE Admin START ]
exports.CreateAdmin = functions.firestore
    .document(`AdminData/admin/admins/{uid}`)
    .onCreate((snap,context)=>{
      const uid = context.params.uid;
      const db = admin.firestore();
      return db.doc(`users/${uid}`).update({admin:true});
    })
// [ CREATE Admin END ]
// [ DELETE Admin START ]
exports.DeleteAdmin = functions.firestore
    .document(`AdminData/admin/admins/{uid}`)
    .onDelete((snap,context)=>{
      const uid = context.params.uid;
      const db = admin.firestore();
      return db.doc(`users/${uid}`).update({admin:false});
    })
// [ DELETE Admin END ]

// [ CREATE ORDER START ]
exports.createOrder = functions.firestore
.document(`orders/{oid}`)
.onCreate((snap,context)=>{
  const db = admin.firestore();
  const batch = db.batch();
  const data:any = snap.data();
  const uid = data.buyer_uid;
  return db.collection(`users/${uid}/basket`).get().then((querySnapshot:any)=>{
    querySnapshot.forEach((doc:any) => batch.delete(doc.ref));
  })
  .then(()=>{
    if(data.pay_type==='point'){
      const pointTransactionRef = db.collection(`point/logs/point_transaction`).doc();
      batch.set(pointTransactionRef,{ from_uid:uid, to_uid:'root', point:data.pay_amount });
    }
    batch.set(snap.ref,{ order_id:context.params.oid, create_timestamp: new Date().getTime() },{merge:true});
    return batch.commit()
  }).catch((err:any)=>snap.ref.delete());
})
// [ CREATE ORDER END ]

// [ CREATE OrderToChangeStatus START ]
exports.createOrderToChangeStatus = functions.firestore
.document(`OrdersToChangeStatus/{oid}`)
.onCreate((snap,context)=>{
  const db = admin.firestore();
  const batch = db.batch();
  const data:any = snap.data();
  const oid = data.order_id;

  let status_old = null;
  let status_new = (data.invoice)?"배송중":data.order_status;

  return db.doc(`orders/${oid}`).get().then((oDoc:any)=>{
    const order = oDoc.data();
    status_old = order.order_status;
    batch.delete(snap.ref);
    switch(status_new){
      case '신규주문':
        if(status_old !== '발주확인') return ;
        batch.update(oDoc.ref,{ order_status:status_new });
        break;
      case '발주확인':
        console.log('발주확인 준비');
        if(status_old !== '신규주문') return ;
        batch.update(oDoc.ref,{ order_status:status_new });
        console.log('발주확인 준비완료');
        break;
      case '배송중':
        if(status_old !== '발주확인' && status_old !== '배송중') return ;
        batch.set(oDoc.ref,{ invoice:data.invoice },{merge:true});
        batch.update(oDoc.ref,{ order_status:status_new });
        break;
      case '배송완료':
        if(status_old !== '배송중') return ;
        batch.update(oDoc.ref,{ order_status:status_new });
        break;
      case'주문취소':
        console.log('주문취소 실행');
        batch.update(oDoc.ref,{ order_status:status_new });
        if(order.pay_type !== 'point') return ; 
        if(status_old !== '신규주문') return ;
        console.log('주문취소 실행 - 포인트 반납 실행');
        db.doc(`AdminData/ROOT`).get().then((rootDoc:any)=>{
          const pointTransactionRef = db.collection(`point/logs/point_transaction`).doc();
          batch.set(pointTransactionRef,{
            from_uid: rootDoc.data().master_uid,
            to_uid: order.buyer_uid,
            point: order.pay_amount,
          })
          console.log('주문취소 실행 - 포인트 반납 준비완료');
        })
        break;
    }
    return ;
  })
  .then(()=> batch.commit())
  .catch((err:any)=>snap.ref.delete());
})
// [ CREATE OrderToChangeStatus END ]

// [ CREATE APCinput START ]
exports.APCinput = functions.firestore
.document(`Products/AutoProductComponent/input/{input_id}`)
.onCreate((snap,context)=>{
  const db = admin.firestore();
  const batch = db.batch();
  const data:any = snap.data();
  const inputId = context.params.input_id;
  const components = data.components;
  const outputRef = db.collection(`Products/AutoProductComponent/output`).doc(inputId);
  
  if(!components){ return snap.ref.delete(); }
  data.components = admin.firestore.FieldValue.delete();
  data.input_id = inputId;
  batch.update(snap.ref,data);
  batch.set(outputRef,{input_id:inputId,components:components});
  return batch.commit()
  .catch((err:any)=>snap.ref.delete());
});
// [ CREATE APCinput END ]

// [ WRITE TotalShoppingBasket START ] 
exports.TotalShoppingBasket = functions.firestore
  .document('users/{uid}/basket/{basket_id}')
  .onWrite((event,context)=> {
    const db = admin.firestore();
    const uid = context.params.uid;
    const basketDataRef = db.doc(`users/${uid}/data/basket`);
    return db.collection(`users/${uid}/basket`).get().then((snap:any)=>{
      let pointPaymentPossible = true;
      let amountToPay = 0;
      snap.forEach((doc:any) => { 
        amountToPay += doc.data().package_total_price; 
        pointPaymentPossible = doc.data().package_point_availability;
      });
      amountToPay += (amountToPay < 30000)?2500:0;
      return basketDataRef.set({
        amountToPay:amountToPay,
        pointPaymentPossible:pointPaymentPossible
      });
    });
});
// [ WRITE TotalShoppingBasket END ] 

//[ AUTH USER CREATE and DELETE START ]
exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
  const db = admin.firestore();
  const batch = db.batch();
  const userRef = db.doc(`users/${user.uid}`);
  const userPointWalletRef = db.doc(`point/logs/user_point/${user.uid}`);
  batch.set(userRef, {uid: user.uid,create_timestamp: new Date().getTime(),email:user.email}, {merge:true});
  batch.set(userPointWalletRef, {uid:user.uid,have_point:0});
  return batch.commit()
              .then(()=>{console.log('회원가입한사람 정보세팅 성공');})
              .catch((err:any)=>{console.log('회원가입한사람 정보세팅 실패 : '+err);})
});
exports.sendByeEmail = functions.auth.user().onDelete((user) => {
  const db = admin.firestore();
  const batch = db.batch();
  batch.delete(`users/${user.uid}`);
  batch.delete(`point/logs/user_point/${user.uid}`);
  return batch.commit();
});
//[ AUTH USER CREATE and DELETE END ]
