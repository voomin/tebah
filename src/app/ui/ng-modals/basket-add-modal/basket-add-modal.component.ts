import { Component, Input  } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PackageGuide } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products/products.service';
import { BaseketService } from 'src/app/services/baseket.service';

@Component({
  selector: 'app-basket-add-modal',
  templateUrl: './basket-add-modal.component.html',
  styleUrls: ['./basket-add-modal.component.sass']
})
export class BasketAddModalComponent{
  @Input() pg:PackageGuide;
  @Input() product;
  
  public countSelectProduct = 1;

  constructor(
    public activeModal: NgbActiveModal,
    public _productsService : ProductsService,
    public _basketService : BaseketService
    ) {}

  onPackage(pid:string){this._productsService.getPackage(pid).subscribe(p=>{this.product = p;})}
  onAddCount(num:number){ this.countSelectProduct += num; this.countSelectProduct = (this.countSelectProduct<1)?1:this.countSelectProduct; }
  onSubmit(){
    this.activeModal.close('onSubmit() close')
    this._basketService.setAddtoBasket(this.product,this.countSelectProduct);
    this.countSelectProduct=1;
  }
}
