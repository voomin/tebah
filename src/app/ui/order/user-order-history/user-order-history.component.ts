import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { User } from 'src/app/interfaces/user';
import { Order } from 'src/app/interfaces/order';

@Component({
  selector: 'app-user-order-history',
  templateUrl: './user-order-history.component.html',
  styleUrls: ['./user-order-history.component.sass']
})
export class UserOrderHistoryComponent implements OnInit {
  public orders;
  public selectOrder;
  constructor(
    public auth:AuthService,
    private _orderService:OrderService,
  ) {
    this.auth.user$.subscribe((u:User)=>{
      if(u.uid){ 
        this.orders = this._orderService.getUserOrders(u.uid);
      }})
   }

  ngOnInit() {
  }
  onOrder(o:Order){
    this.selectOrder = o;
  }
  onOrderCancle(oid:string,selectOrderStatus:string){
    this._orderService.orderCancel(oid,selectOrderStatus);
  }
  onOrderCompleted(oid:string){this._orderService.setCompleted(oid);}
}
