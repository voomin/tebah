import { Component, OnInit } from '@angular/core';
import { SideMenuService } from '../../../../services/products/barotok/side-menu.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { PackageProduct } from 'src/app/interfaces/product';
import { AuthService } from 'src/app/services/auth.service';
import { BaseketService } from 'src/app/services/baseket.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.sass']
})
export class SideMenuComponent implements OnInit {
  public sideMenu = [];
  public packages;
  public selectProduct;
  public selectProductCount:number=1;

  constructor(
    public auth: AuthService,
    private _siedMenuService : SideMenuService,
    private _productService : ProductsService,
    private _basketService : BaseketService
    ) {  }

  ngOnInit() {
    this.sideMenu = this._siedMenuService.getSideMenu();
    this.selectProduct = this._productService.getPackage(this._siedMenuService.getBarotokPiDorNull());
  }
  onAddCount(num:number){ this.selectProductCount += num; this.selectProductCount = (this.selectProductCount<1)?1:this.selectProductCount; }
  onSubmitAddtoBasket(p:PackageProduct){
    this._basketService.setAddtoBasket(p,this.selectProductCount);
    this.selectProductCount = 1;
  }
}
