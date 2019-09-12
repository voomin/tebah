import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ProductsService } from 'src/app/services/products/products.service';
import { AuthService } from 'src/app/services/auth.service';
import { BaseketService } from 'src/app/services/baseket.service';
import { auth } from 'firebase';
import { ProductBasket } from 'src/app/interfaces/user';
import { PackageProduct, PackageGuide } from 'src/app/interfaces/product';
import { map } from 'rxjs/operators';
import { BasketAddModalComponent } from '../ng-modals/basket-add-modal/basket-add-modal.component';


@Component({
  selector: 'app-tebah-mall',
  templateUrl: './tebah-mall.component.html',
  styleUrls: ['./tebah-mall.component.sass']
})

export class TebahMallComponent implements OnInit {
  public packageGuides;
  public packages;

  constructor(
    public auth: AuthService,
    private _productsService: ProductsService,
    private _basketService: BaseketService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.packageGuides = this._productsService.getPackageGuidesShow();
    this.packages = this._productsService.getPackagesShow();
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
