import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs' ;
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { map, retry } from 'rxjs/operators';
import { AlertService } from 'ngx-alerts';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderCollection : AngularFirestoreCollection<any[]>;
  orders : Observable<any[]>;
  constructor(
    public _afs: AngularFirestore,
    private _alertService:AlertService,
    private _location:Location
  ) {
    this.orderCollection = this._afs.collection(`orders`, ref => ref.orderBy('create_timestamp','desc'));
    this.orders = this.orderCollection.snapshotChanges()
    .pipe( map(changes =>changes.map(c => ({...c.payload.doc.data()}))) );
  }
  public setTebahPointOrder(order:Order){
    this.setTebahOrder(order,'point');
  }
  public setTebahKRWOrder(order:Order){
    this.setTebahOrder(order,'KRW');
  }
  private setTebahOrder(order:Order,payType:string){
    this._alertService.info('주문서 확인중..');
    let inputOrder:Order = {
      order_status : "신규주문",
      reciever_displayName : order.reciever_displayName,
      reciever_tel : order.reciever_tel,
      shipping_postcode : order.shipping_postcode,
      shipping_address : order.shipping_address,
      shipping_message : order.shipping_message,
      salesChannel_id : 'yVSnThqPm7QAEDJBy2Yt',
      salesChannel_title : '테바몰',
      pay_type : payType,
      buyer_uid: order.buyer_uid,
      buyer_displayName: order.buyer_displayName,
      shipping_price:order.shipping_price,
      pay_amount:order.pay_amount,
      components_packages:order.components_packages,
    };
    console.log(inputOrder);
    this._alertService.info('주문서 추가중..');
    return this._afs.collection(`orders`).add(inputOrder)
      .then(()=>{ 
        this._alertService.success('성공적으로 주문이 접수되었습니다');
        window.location.href = '/order-history';
        //this._location.go('/order-history');
      })
      .catch((err)=>{this._alertService.danger('주문접수 실패했습니다 : '+err);})
  }
  public orderCancel(oid:string,selectOrderStatus:string){
    if(selectOrderStatus!='신규주문'){
      this._alertService.warning('주문취소 할 수 없는 상태 입니다.'); return;
    }
    if(!confirm('정말로 주문 취소 하시겠습니까?')){ return ; }
    return this._afs.doc(`OrdersToChangeStatus/${oid}`).set({
      order_id:oid,
      order_status:'주문취소'
    })
    .then(()=>{ this._alertService.success('주문취소 처리 되었습니다.') })
    .catch((err)=>{ this._alertService.danger('주문취소 실패했습니다 : '+err) })
  }
  public getUserOrders(uid:string){
    return this._afs.collection('orders', ref => ref.where('buyer_uid','==',uid).orderBy('create_timestamp','desc')).snapshotChanges()
      .pipe( map(changes =>changes.map(c => ({...c.payload.doc.data()}))) );
  }
  public setConfirmStatus(oid:string){
    if(!oid) return ;

    return this._afs.doc(`OrdersToChangeStatus/${oid}`).set({
      order_id:oid,
      order_status:'발주확인'
    })
    .then(()=>{ this._alertService.success('발주확인 처리 되었습니다.'); })
    .catch((err)=>{ this._alertService.danger('발주확인 실패했습니다 : '+err) })
  }
  public setCompleted(oid:string){
    if(!oid) return ;

    return this._afs.doc(`OrdersToChangeStatus/${oid}`).set({
      order_id:oid,
      order_status:'배송완료'
    })
    .then(()=>{ this._alertService.success('배송완료 처리 되었습니다.'); })
    .catch((err)=>{ this._alertService.danger('배송완료 처리 실패했습니다 : '+err) })

  }
  public setInvoice(oid:string, invoice:number){
    if(!oid || !invoice) return ;

    console.log(`${oid} + ${invoice}`)
    
    return this._afs.doc(`OrdersToChangeStatus/${oid}`).set({
      order_id:oid,
      invoice: invoice,
    })
    .then(()=>{ this._alertService.success('운송장번호 등록 처리 되었습니다.'); })
    .catch((err)=>{ this._alertService.danger('실패했습니다 : '+err) })
  }
  public setAllConfirmStatus(){//발주확인상태로 변경
    
  }
  public getCompleted(){ return this.getOrdersStatus('배송완료'); }
  public getShipping(){ return this.getOrdersStatus('배송중'); }
  public getConfirm(){ return this.getOrdersStatus('발주확인'); }
  public getNew(){ return this.getOrdersStatus('신규주문'); }
  public getCancel(){ return this.getOrdersStatus('주문취소'); }
  private getOrdersStatus(status:string){
    return this.getOrders().pipe(
      map((orders:Order[])=> orders.filter(o => o.order_status === status))
    );
  }
  private getOrders(){
    return this.orders;
  }
}
