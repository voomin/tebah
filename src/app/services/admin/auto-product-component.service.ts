import { Injectable } from '@angular/core';
import { Observable } from 'rxjs' ;
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { AlertService } from 'ngx-alerts';
import { InputAPC, OutputAPC } from 'src/app/interfaces/product';
import { SalesChannelsService } from '../sales-channels.service';
import { SalesChannel } from 'src/app/interfaces/sales-channel';
import { WaitingOrder } from 'src/app/interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class AutoProductComponentService {
  public excelColumnsMap={
    order_id_shoplinker: "주문번호(샾링커)",
    order_id_salesChannel: "주문번호(쇼핑몰)",
    product_name: "상품명",
    product_option: "옵션 (수량없음)",
    product_count: "수량",
    payment_price: "판매가격",
    salesChannel_title: "쇼핑몰명",
    buyer_displayName: '주문자',
    reciever_displayName: "수취인",
    reciever_phone: "수취인 핸드폰전화",
    reciever_tel: "수취인 일반전화",
    reciever_postcode: "수취인 우편번호",
    shipping_address:"동이하 주소(100)",
    shipping_message:"배송메세지(100)"
  };
  
  // private inputAPCCollection : AngularFirestoreCollection<InputAPC>; private inputAPCs : Observable<InputAPC[]>;
  // private outputAPCCollection : AngularFirestoreCollection<OutputAPC>; private outputAPCs : Observable<OutputAPC[]>;
  constructor(
    public _afs: AngularFirestore,
    private _alertService:AlertService,
    private _salesChannelService:SalesChannelsService
  ) { 
    // this.inputAPCCollection = _afs.collection("Products/AutoProductComponent/input");
    // this.outputAPCCollection = _afs.collection("Products/AutoProductComponent/output");

    // this.inputAPCs = this.inputAPCCollection.snapshotChanges()
    //     .pipe(map(changes =>changes.map(c =>({...c.payload.doc.data()}))));
    // this.outputAPCs = this.outputAPCCollection.snapshotChanges()
    //     .pipe(map(changes =>changes.map(c =>({...c.payload.doc.data()}))));
  }
  public getExcelColumns(){ return this.excelColumnsMap;}
  public setWaingOrder(o:any){
    let watingOrder:WaitingOrder={
      order_id_shoplinker: o[this.excelColumnsMap.order_id_shoplinker],
      order_id_salesChannel: o[this.excelColumnsMap.order_id_salesChannel],
      order_status: '신규주문',
      buyer_displayName: o[this.excelColumnsMap.buyer_displayName],
      reciever_displayName: o[this.excelColumnsMap.reciever_displayName],
      reciever_tel:o[this.excelColumnsMap.reciever_tel],
      //shipping_price: 2500 ?,
      shipping_postcode: o[this.excelColumnsMap.reciever_postcode],
      shipping_address: o[this.excelColumnsMap.shipping_address],
      shipping_message: o[this.excelColumnsMap.shipping_message],
      pay_amount:o[this.excelColumnsMap.payment_price],
      pay_type:'KRW',
      //salesChannel_id: o
      salesChannel_title: o[this.excelColumnsMap.salesChannel_title],
    }
    console.log(watingOrder);
    // return ;
  }
  // public getSingleComponents(o:WaitingOrder){
  //   const pName = o[this.excelColumnsMap.product_name];
  //   const pOption = o[this.excelColumnsMap.product_option];
  //   const pPrice = o[this.excelColumnsMap.payment_price];
  //   const salesChannelTitle = o[this.excelColumnsMap.salesChannel_title];
  //   console.log(`${pName}, ${pOption}, ${pPrice}, ${salesChannelTitle}`);
  // }
}

