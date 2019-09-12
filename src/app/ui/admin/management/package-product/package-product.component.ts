import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { SalesChannelsService } from 'src/app/services/sales-channels.service';
import { PackageProduct, packageInPackageGuide, PackageGuide } from 'src/app/interfaces/product';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-package-product',
  templateUrl: './package-product.component.html',
  styleUrls: ['./package-product.component.sass']
})
export class PackageProductComponent implements OnInit {
  public singles;
  public packages;
  public packageGuides;
  public salesChannels;

  public selectPackage:PackageProduct;
  public selectPackageGuide:PackageGuide;

  //package ADD
  public inputTitle: string;
  public inputPrice: number;
  public inputDescription: string;
  public inputSC_id: string;
  public inputSC_title: string;
  public inputThumb_imgUrl : string;
  public inputMoreLink: string;
  public inputSingles=[]; 
  public inputShow:boolean = false; 
  public inputPointAvailability:boolean = false;


  //packageGuide ADD
  public inputPGTitle :string;
  public inputPGMinPrice : number;
  public inputPGMaxPrice : number;
  public inputPGThumb_imgUrl : string;
  public inputPGMoreLink : string;
  public inputPGPackages:packageInPackageGuide[]=[]; 
  public inputPGPackagesObject = {};
  public inputPGDescription: string;
  public inputPGShow : boolean = false;
  public inputPGPointAvailability:boolean = false;

  


  constructor(
    public auth : AuthService,
    private _productsService : ProductsService,
    private _saleschannelsService: SalesChannelsService,
  ) { }

  ngOnInit() {
    this.singles = this._productsService.getSingles();
    this.packages = this._productsService.getPackages();
    this.packageGuides = this._productsService.getPackageGuides();
    this.salesChannels = this._saleschannelsService.getSalesChannels();
  }

  onPackage(pk:PackageProduct){ this.selectPackage = pk; } 
  onPackageGuide(pg:PackageGuide){ this.selectPackageGuide = pg; }

  onCheckedChannel(id,title){
    this.inputSC_id = id;
    this.inputSC_title = title;
  }
  onProductUpdate(){ this._productsService.updatePackage(this.selectPackage); }
  onProductDelete(){ this._productsService.deletePackage(this.selectPackage); }
  onProductAdd(){
    const map = this.arrayMapping(this.inputSingles);
    let packageProduct: PackageProduct ={
      //package_id?:string;
      title: this.inputTitle,
      price: this.inputPrice,
      salesChannel_id: this.inputSC_id,
      salesChannel_title: this.inputSC_title,
      singles: map,
      thumb_imgUrl: this.inputThumb_imgUrl,
      show: this.inputShow,
      point_availability : this.inputPointAvailability
      //imgUrls?: object;
    };
    if(this.inputDescription){
      packageProduct.description =this.inputDescription;
    }
    if(this.inputMoreLink){
      packageProduct.moreLink = this.inputMoreLink;
    }
    this._productsService.setPackage(packageProduct);
  }
  arrayMapping(array){
    const map = {};
    for(let key in array){
      const num = array[key];
      map[key]=num;
    }
    return map;
  }
  selectPackageInPG(p:PackageProduct){
    this.inputPGPackagesObject[p.package_id] = this.inputPGPackagesObject[p.package_id]?null:p;
  }
  onPackageGuideUpdate(){ this._productsService.updatePackageGuide(this.selectPackageGuide); }
  onPackageGuideDelete(){ this._productsService.deletePackageGuide(this.selectPackageGuide); }
  onPackageGuideAdd(){
    this.inputPGMinPrice = null;
    this.inputPGMaxPrice = null;
    this.inputPGPackages = [];
    this.inputPGPointAvailability = false;

    for(let key in this.inputPGPackagesObject){
      if(this.inputPGPackagesObject[key]){
        const p:PackageProduct = this.inputPGPackagesObject[key];
        const pInPG : packageInPackageGuide = {
          title:'test',
          package_id : p.package_id,
          package_title: p.title,
          package_price: p.price,
        }
        this.inputPGPackages.push(pInPG);
        const min = this.inputPGMinPrice;
        const max = this.inputPGMaxPrice;
        const price = p.price;
        this.inputPGMinPrice = min?(price<min)?price:min:price;
        this.inputPGMaxPrice = max?(price>max)?price:max:price;
        if(!this.inputPGPointAvailability){
          this.inputPGPointAvailability = p.point_availability;
        }
      }
    }
    let PG : PackageGuide ={
      title:this.inputPGTitle,
      min_price:this.inputPGMinPrice,
      max_price:this.inputPGMaxPrice,
      packages:this.inputPGPackages,
      thumb_imgUrl : this.inputPGThumb_imgUrl,
      point_availability: this.inputPGPointAvailability
    }
    if(this.inputPGDescription){ PG.description = this.inputPGDescription; }
    if(this.inputPGMoreLink){ PG.moreLink = this.inputPGMoreLink; }
    console.log(PG);
    this._productsService.setPackageGuide(PG);
    this.inputPGPackages = [];
  }
}
