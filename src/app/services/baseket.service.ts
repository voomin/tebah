import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs' ;
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { AlertService } from 'ngx-alerts';
import { PackageProduct } from '../interfaces/product';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BaseketService {
  private uid;
  // private basket : Observable<any[]>;
  constructor(
    private _afs: AngularFirestore,
    public _auth: AuthService,
    private _router:Router,
    private _alertService:AlertService
  ) { 
    this._auth.user$.subscribe(u=>{
      this.uid = (u)? u.uid : null;  
    })
    
  }
  setDeltoBasket(basketId:string){
    if(!this.uid) return ;
    this._alertService.info('장바구니에 제거중..');
    return this._afs.doc(`users/${this.uid}/basket/${basketId}`).delete()
    .then(()=>{ this._alertService.success(`정상적으로 제거되었습니다.`); return true;})
    .catch((err)=>{this._alertService.danger('실패 : '+err); return err;})
  }
  setAddtoBasket(p:PackageProduct,package_count:number){
    if(!this.uid) return ;
    if(!p) { 
      this._alertService.warning('상품이 선택되지 않았습니다.'); 
      this._router.navigate(['/mall']);
      return; 
    }
    this._alertService.info('장바구니에 추가중..');
    return this._afs.collection(`users/${this.uid}/basket`).add({
      package_id:p.package_id,
      package_title:p.title,
      package_count: package_count,
      package_total_price: p.price * package_count,
      package_point_availability: p.point_availability
    })
    .then(()=>{ this._alertService.success(`${p.title} ${package_count}개 추가되었습니다.`); return true;})
    .catch((err)=>{this._alertService.danger('실패 : '+err); return err;})
  }
  getBasket(uid:string){ 
    if(!uid) return;
    return this._afs.collection(`users/${uid}/basket`, ref=> ref.orderBy('package_title')).snapshotChanges()
            .pipe( map(changes =>changes.map(c => ({id:c.payload.doc.id,...c.payload.doc.data()}))) )
  }
  getUserBasketData(uid:string){
    return this._afs.doc(`users/${uid}/data/basket`).snapshotChanges()
    .pipe(map(c=>({...c.payload.data()})));
  }
  // getBilge(uid:string){
  //   if(!uid) return;
  //   return this._afs.doc(`users/${uid}/data/bilge`).snapshotChanges()
  //           .pipe( map(c =>({...c.payload.data()})) )
  // }
}
