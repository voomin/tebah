import { ProductBasket } from './user';
import { SingleProduct } from './product';

export interface Order {
  order_id?: string;
  order_status?:string;
  buyer_uid: string;
  buyer_displayName: string;
  reciever_displayName:string;
  reciever_tel:string;
  shipping_price:number;
  shipping_postcode:string;
  shipping_address:string;
  shipping_message:string;
  pay_amount:number;
  pay_type?:string;
  salesChannel_id?: string;
  salesChannel_title?:string;
  create_timestamp?: number;
  components_packages? : ProductBasket[],
}
export interface OrderToChangeStatus {
  order_id:string;
  order_status:string;
}
export interface WaitingOrder {
  order_id_shoplinker:string;
  order_id_salesChannel:string;
  order_status:string;
  buyer_displayName:string;
  reciever_displayName:string;
  reciever_tel:string;
  shipping_price?:number;
  shipping_postcode?:string;
  shipping_address:string;
  shipping_message?:string;
  pay_amount:number;
  pay_type:string;
  salesChannel_id?:string;
  salesChannel_title:string;
  create_timestamp?:number;
  components_singles? : SingleProduct[];
}