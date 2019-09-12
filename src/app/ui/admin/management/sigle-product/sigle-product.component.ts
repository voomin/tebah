import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { SingleProduct } from 'src/app/interfaces/product';

@Component({
  selector: 'app-sigle-product',
  templateUrl: './sigle-product.component.html',
  styleUrls: ['./sigle-product.component.sass']
})
export class SigleProductComponent implements OnInit {

  public singleProducts;
  public selectProduct:SingleProduct;

  constructor(
    public auth : AuthService,
    private _productsService : ProductsService
  ) { }

  ngOnInit() {
    this.singleProducts = this._productsService.getSingles();
  }
  
  onProductAdd(title:string){ this._productsService.setSingle(title); }
  onProductInfo(product:SingleProduct){ this.selectProduct = product;}
  onProductUpdate(){ this._productsService.updateSingle(this.selectProduct); }
  onProductDelete(){ this._productsService.deleteSingle(this.selectProduct); }

}
