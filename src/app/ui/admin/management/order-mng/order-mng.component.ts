import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/interfaces/order';

@Component({
  selector: 'app-order-mng',
  templateUrl: './order-mng.component.html',
  styleUrls: ['./order-mng.component.sass']
})
export class OrderMngComponent implements OnInit {
  public orders;
  public selectOrder;
  public selectOrderStatus = null;
  
  constructor(
    public auth : AuthService,
    private _orderService: OrderService,
  ) {}
  ngOnInit() {
    this.selectOrderNew();
  }
  onOrderInfo(order:Order){ this.selectOrder = order; }
  selectOrderNew(){ 
    this.selectOrderStatus = '신규주문';
    this.orders = this._orderService.getNew(); }
  selectOrderCancel(){ 
    this.selectOrderStatus = '주문취소';
    this.orders = this._orderService.getCancel(); }
  selectOrderConfirm(){ 
    this.selectOrderStatus = '발주확인';
    this.orders = this._orderService.getConfirm(); }
  selectOrderShipping(){ 
    this.selectOrderStatus = '배송중';
    this.orders = this._orderService.getShipping(); }
  selectOrderCompleted(){ 
    this.selectOrderStatus = '배송완료';
    this.orders = this._orderService.getCompleted(); }

  submitOrderConfirm(oid:string){ this._orderService.setConfirmStatus(oid)}
  submitOrderInvoiceInsert(oid:string, invoice:number){ this._orderService.setInvoice(oid,invoice); }
  submitOrderCompleted(oid:string){ this._orderService.setCompleted(oid)}
}
