import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { AuthService } from 'src/app/services/auth.service';
import { BaseketService } from 'src/app/services/baseket.service';
import { BasketAddModalComponent } from '../../ng-modals/basket-add-modal/basket-add-modal.component';
import { PackageGuide, PackageProduct } from 'src/app/interfaces/product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-point-mall',
  templateUrl: './point-mall.component.html',
  styleUrls: ['./point-mall.component.sass']
})
export class PointMallComponent implements OnInit {
  public packageGuides;
  public packages;
  
  constructor(
    public auth: AuthService,
    private _productsService: ProductsService,
    private _basketService: BaseketService,
    private modalService: NgbModal
    ) { }

  ngOnInit() {
    this.packageGuides = this._productsService.getPGPoint();
    this.packages = this._productsService.getPackageTBMPoint();
  }
  onBuyinPG(pg:PackageGuide) {
    const modalRef = this.modalService.open(BasketAddModalComponent);
    modalRef.componentInstance.pg = pg;
  }
  onBuyinPK(pk:PackageProduct) {
    const modalRef = this.modalService.open(BasketAddModalComponent);
    modalRef.componentInstance.product = pk;
  }

}
