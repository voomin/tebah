import { Injectable } from '@angular/core';
import { Observable } from 'rxjs' ;
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { AlertService } from 'ngx-alerts';
import { userPointWallet, deployPointHistory, deployPoint, rootPointWallet, pointTransaction } from 'src/app/interfaces/point';

@Injectable({
  providedIn: 'root'
})
export class ManagementPointService {
  private userPointsCollection : AngularFirestoreCollection<userPointWallet>;
  private deployPointHistoryCollection : AngularFirestoreCollection<deployPointHistory>;
  private pointTransactionCollection : AngularFirestoreCollection<pointTransaction>;

  private deployPointDocument : AngularFirestoreDocument<deployPoint>;
  private rootWalletDocument : AngularFirestoreDocument<rootPointWallet>;

  private deployPoint : Observable<deployPoint>;
  private rootWallet : Observable<rootPointWallet>;
  private userPoints : Observable<userPointWallet[]>;
  private deployPointHistory : Observable<deployPointHistory[]>;
  private pointTransactions : Observable<pointTransaction[]>;

  constructor(
    public _afs: AngularFirestore,
    private _alertService:AlertService
    ) {
    this.userPointsCollection =_afs.collection("point/logs/user_point");
    this.deployPointHistoryCollection = _afs.collection(`point/logs/deploy_point_history`, ref => ref.orderBy('timestamp','desc'));
    this.pointTransactionCollection = _afs.collection(`point/logs/point_transaction`, ref => ref.orderBy('timestamp','desc'));

    this.deployPointDocument = _afs.doc('point/DEPLOY');
    this.rootWalletDocument = _afs.doc('point/root_wallet');
    
    this.userPoints = this.userPointsCollection.snapshotChanges()
        .pipe(map(changes =>changes.map(c =>({uid:c.payload.doc.id, ...c.payload.doc.data()}))));
    this.deployPoint = this.deployPointDocument.snapshotChanges()
        .pipe(map(c=>({...c.payload.data()})));
    this.rootWallet = this.rootWalletDocument.snapshotChanges()
        .pipe(map(c=>({...c.payload.data()})));
    this.deployPointHistory = this.deployPointHistoryCollection.snapshotChanges()
        .pipe(map(changes =>changes.map(c =>({...c.payload.doc.data()}))));
    this.pointTransactions = this.pointTransactionCollection.snapshotChanges()
        .pipe(map(changes =>changes.map(c =>({...c.payload.doc.data()}))));
  }
  setPointTransaction(fromUid,toUid,point){
    if(!fromUid){
      this._alertService.danger('로그인 상태가 아닙니다.');
      return;
    }
    if(!toUid){
      this._alertService.danger('uid를 입력해주세요.');
      return;
    }
    if(!point){
      this._alertService.danger('point를 입력해주세요.');
      return;
    }
    this._alertService.info('포인트 보내기 시도중..');
    return this._afs.collection('point/logs/point_transaction').add({
            from_uid: fromUid,
            to_uid: toUid,
            point: point,
          })
          .then(()=>{ this._alertService.success('성공적으로 보냈습니다.'); })
          .catch((err)=>{this._alertService.danger('보내는데 실패했습니다 : '+err);})

  }
  setDeployPoint(point:number){
    this._alertService.info('발행 시도중.. 네트워크 상태에 따라 시간차가 있을 수 있습니다.');
    return this.deployPointDocument.set({point:point},{merge:true})
          .then(()=>{
            this._alertService.success('성공적으로 발행되었습니다.');
          }).catch(err=>{
            this._alertService.danger('발행에 실패했습니다 : '+err);
          });
  }
  getUserWallet(uid:string){
    return this._afs.doc(`point/logs/user_point/${uid}`).snapshotChanges()
      .pipe( map(c =>({...c.payload.data()})) )
    // return this.userPoints.pipe(
    //   map((getuserPoints:any[])=> getuserPoints.find(userWallet => userWallet.uid === uid))
    // );
  }
  getDeployPoint(){ return this.deployPoint; }
  getRootWallet(){ return this.rootWallet; }
  getDeployPointHistory(){ return this.deployPointHistory; }
  getPointTransactions(){ return this.pointTransactions; }
}
