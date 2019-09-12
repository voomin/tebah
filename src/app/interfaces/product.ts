import { map } from 'rxjs/operators';

export interface SingleProduct {
  single_id?:string;
  title: string;
  create_timestamp: number;
}
export interface PackageProduct {
  package_id?:string;
  title:string;
  description?:string;
  price:number;
  salesChannel_id: string;
  salesChannel_title: string;
  singles?: any;//SingleProduct[];
  thumb_imgUrl: string;
  imgUrls?: object;
  moreLink?:string;
  create_timestamp?:number;
  show?:boolean;
  point_availability?:boolean;
}
export interface PackageGuide{
  packageGuide_id?:string;
  title:string;
  description?:string;
  min_price:number;  
  max_price:number;
  packages:packageInPackageGuide[];//Map<title:string,package:SingleProduct>;
  thumb_imgUrl:string;
  imgUrls?:string[];
  moreLink?:string;
  create_timestamp?:number;
  point_availability?:boolean;
  show?:boolean;
}
export interface packageInPackageGuide{
  title : string;
  package_id : string;
  package_title: string;
  package_price: number;
}
export interface InputAPC{
  input_id:string;
  product_title:string;
  product_option:number;
  product_price:number;
  salesChannel_id:string;
}
export interface OutputAPC{
  input_id:string;
  components:any;
}

