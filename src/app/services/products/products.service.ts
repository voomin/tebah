import { Injectable } from '@angular/core';
import { Observable } from 'rxjs' ;
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { AlertService } from 'ngx-alerts';
import { SingleProduct,PackageProduct, PackageGuide } from 'src/app/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private singlesCollection : AngularFirestoreCollection<any[]>; private singles : Observable<any[]>;
  private packagesCollection : AngularFirestoreCollection<PackageProduct[]>; private packages : Observable<PackageProduct[]>;
  private packageGuidesCollection : AngularFirestoreCollection<PackageGuide[]>; private packageGuides : Observable<PackageGuide[]>;

  constructor(
    public _afs: AngularFirestore,
    private _alertService:AlertService
  ) { 
    this.singlesCollection = _afs.collection(`Products/Components/Singles`, ref => ref.orderBy('title'));
    this.packagesCollection = _afs.collection<PackageProduct[]>(`Products/Components/Packages`, ref=> ref.orderBy('create_timestamp','desc'));
    this.packageGuidesCollection = _afs.collection<PackageGuide[]>(`Products/Guide/PackageGuides`, ref => ref.orderBy('create_timestamp','desc'));

    this.singles = this.singlesCollection.snapshotChanges()
              .pipe( map(changes =>changes.map(c => ({...c.payload.doc.data()}))) );
    this.packages = this.packagesCollection.snapshotChanges()
              .pipe( map(changes =>changes.map<any>(c =>({...c.payload.doc.data()}))) );
    this.packageGuides = this.packageGuidesCollection.snapshotChanges()
              .pipe( map(changes =>changes.map<any>(c =>({...c.payload.doc.data()}))) );
  }
  deleteSingle(product:SingleProduct){
    const delConfirm = window.confirm('정말로 해당 상품을 삭제하시겠습니까?');
    if(delConfirm){
      this._alertService.info('삭제 중..');  
      return this._afs.doc(`Products/Components/Singles/${product.single_id}`).delete()
        .then(()=>{ this._alertService.success('정상적으로 삭제되었습니다.'); })
        .catch((err)=>{ this._alertService.danger('삭제 실패 : '+err); })
    }
    else{ return ;}
  }
  updateSingle(product:SingleProduct){
    if(!product.title){
      return 
    }
    this._alertService.info('업데이트 중..');
    return this._afs.doc(`Products/Components/Singles/${product.single_id}`)
      .update({
        title:product.title
      })
      .then(()=>{ this._alertService.success('성공적으로 업데이트 되었습니다.'); return true;})
      .catch((err)=>{ this._alertService.danger('업데이트 실패 : '+err); return err;});
  }
  deletePackage(product:PackageProduct){
    return window.confirm('정말로 삭제하시겠습니까?')
            ?this._afs.doc(`Products/Components/Packages/${product.package_id}`).delete()
              .then(()=>{ this._alertService.success('성공적으로 삭제 되었습니다.'); return true;})
              .catch((err)=>{ this._alertService.danger('삭제 실패 : '+err); return err;}):null;
  }
  updatePackage(product:PackageProduct){
    this._alertService.info('업데이트 중..');
    console.log(product);
    return this._afs.doc(`Products/Components/Packages/${product.package_id}`)
      .update({
        title:product.title,
        price:product.price,
        singles:product.singles,
        thumb_imgUrl:product.thumb_imgUrl,
        description:product.description,
        moreLink:product.moreLink,
        show:product.show,
        point_availability:product.point_availability,
      })
      .then(()=>{ this._alertService.success('성공적으로 업데이트 되었습니다.'); return true;})
      .catch((err)=>{ this._alertService.danger('업데이트 실패 : '+err); return err;});
  }
  deletePackageGuide(pg:PackageGuide){
    if(!window.confirm('정말로 삭제하시겠습니까?')){
      return;
    }
    this._alertService.info('삭제하는중..');
    return this._afs.doc(`Products/Guide/PackageGuides/${pg.packageGuide_id}`).delete()
      .then(()=>{ this._alertService.success('성공적으로 삭제 되었습니다.');})
      .catch((err)=>{ this._alertService.danger('삭제 실패 : '+err);});
  }
  updatePackageGuide(pg:PackageGuide){
    this._alertService.info('업데이트 중..');
    console.log(pg);
    return this._afs.doc(`Products/Guide/PackageGuides/${pg.packageGuide_id}`)
      //.update(pg)
      .update({
        title:pg.title?pg.title:null,
        thumb_imgUrl:pg.thumb_imgUrl?pg.thumb_imgUrl:null,
        description:pg.description?pg.description:null,
        moreLink:pg.moreLink?pg.moreLink:null,
        show:pg.show,
        point_availability:pg.point_availability,
      })
      .then(()=>{ this._alertService.success('성공적으로 업데이트 되었습니다.'); return true;})
      .catch((err)=>{ this._alertService.danger('업데이트 실패 : '+err); return err;});
  }
  setSingle(title:string){
    if(!title){
      this._alertService.warning('실패 : 상품명을 입력하지 않았습니다.');
      return;
    }
    this._alertService.info('Single 추가 중 ..');
    let product : any ={
      title:title
    };  
    return this.singlesCollection.add(product)
    .then(()=>{ this._alertService.success('성공'); return true;})
    .catch((err)=>{this._alertService.danger('실패 : '+err); return err;})
  }
  setPackage(product:PackageProduct){
    if(!product.description){
      this._alertService.warning(`패키지상품 설명을 입력해주세요.`);
      return ;
    }
    if(!product.moreLink){
      this._alertService.warning(`자세히 링크 URL을 입력해주세요.`);
      return ;
    }
    if( product.salesChannel_title !== '테바몰'){
      this._alertService.warning(`판매채널을 테바몰로 선택해 주세요.`);
      return ;
    }
    this._alertService.info('Package 추가 중 ..');
    return this._afs.collection(`Products/Components/Packages`).add(product)
    .then(()=>{ this._alertService.success('성공'); return; })
    .catch((err)=>{this._alertService.danger('실패 : '+err); return err;})
  }
  setPackageGuide(p:PackageGuide){
    if(p.packages.length <= 0){
      this._alertService.warning('실패 : 선택된 패키지가 없습니다.');
      return;
    }
    if(!p.title){
      this._alertService.warning('실패 : 제목이 없습니다');
      return;
    }
    if(!p.thumb_imgUrl){
      this._alertService.warning('실패 : 미리보기 사진 URL을 입력해주세요');
      return;
    }
    this._alertService.info('PackageGuide 추가 중 ..');
    return this._afs.collection(`Products/Guide/PackageGuides`).add(p)
      .then(()=>{ this._alertService.success('성공'); return; })
      .catch((err)=>{this._alertService.danger('실패 : '+err); return err;})
  }
  getPackage(pid:string){
    if(!pid){
      return ;
    }
    return this._afs.doc(`Products/Components/Packages/${pid}`).snapshotChanges()
      .pipe( map(c => ({...c.payload.data()})) ) ;
    // return this.getPackages().pipe(
    //   map((pks:PackageProduct[])=> pks.find(p => p.package_id === pid))
    // );
  }
  getPGPoint(){
    return this.getPackageGuides().pipe(
      map((pgs:PackageGuide[])=> pgs.filter(
        (pg:PackageGuide)=>(pg.point_availability && pg.show)
        )))
  }
  getPackageTBMPoint(){
    return this.getPackages().pipe(
      map((packages:PackageProduct[])=> packages.filter(
        (pk:PackageProduct)=>(pk.salesChannel_id === 'yVSnThqPm7QAEDJBy2Yt' && pk.point_availability && pk.show)
        )))
  }
  getPackageInTebahMall(){
    return this.getPackages().pipe(
      map((packages:PackageProduct[])=> packages.filter(
        (pk:PackageProduct)=>(pk.salesChannel_id === 'yVSnThqPm7QAEDJBy2Yt' && pk.show)
        )))
  }
  getPackageGuidesShow(){
    return this.getPackageGuides().pipe(
      map((pgs:PackageGuide[])=> pgs.filter(
        (pg:PackageGuide)=>(pg.show)
        )))
  }
  getPackagesShow(){
    return this.getPackages().pipe(
      map((pks:PackageProduct[])=> pks.filter(
        (p:PackageProduct)=>(p.show)
        )))
  }
  getSingles(){ return this.singles; }
  getPackages(){ return this.packages; }
  getPackageGuides(){ return this.packageGuides;}
}
