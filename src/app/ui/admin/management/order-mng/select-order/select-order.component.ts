import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-select-order',
  templateUrl: './select-order.component.html',
  styleUrls: ['./select-order.component.sass']
})
export class SelectOrderComponent implements OnInit {
  public orders;

  constructor(
    private _orderService: OrderService
  ) { }

  ngOnInit() {
    this.orders = this._orderService.getConfirm();
  }

}
