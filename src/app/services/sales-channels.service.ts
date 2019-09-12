import { Injectable } from '@angular/core';
import { Observable } from 'rxjs' ;
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { AlertService } from 'ngx-alerts';
import { SalesChannel } from '../interfaces/sales-channel';

@Injectable({
  providedIn: 'root'
})
export class SalesChannelsService {
  salesChannelsCollection: AngularFirestoreCollection<any[]>;
  salesChannels:Observable<any[]>;

  constructor(
    public _afs: AngularFirestore,
    private _alertService:AlertService
    ) {
    this.salesChannelsCollection = _afs.collection(`SalesChannels`, ref => ref.orderBy('title'));
    this.salesChannels = this.salesChannelsCollection.snapshotChanges()
                  .pipe( map(changes =>changes.map(c => ({...c.payload.doc.data()}))) );
  }
  // getsalesChannel(id:string){
  //   return this.getsalesChannels().pipe(
  //     map((salesChannels:any[])=> salesChannels.find(salesChannel => salesChannel.id === id))
  //   );
  // }
  setSalesChannel(title:string,type:string){
    this._alertService.info('판매채널 확장 중 입니다...');
    return this._afs.collection(`SalesChannels`).add({
      title: title,
      type: type
    })
    .then(()=>{ this._alertService.success('성공적으로 확장했습니다.'); })
    .catch((err)=>{this._alertService.danger('확장하는데 실패했습니다 : '+err);})
  }
  updateSalesChannel(sc:SalesChannel){
    this._alertService.info('업데이트 중 입니다');
    console.log(sc);
    return this._afs.doc(`SalesChannels/${sc.salesChannel_id}`).update({
      title:sc.title,
      type:sc.type
    })
    .then(()=>{ this._alertService.success('성공'); return ;})
    .catch((err)=>{this._alertService.danger('실패 : '+err); console.log(err); return ;})
  }
  deleteSalesChannel(sc:SalesChannel){
    if(!window.confirm('정말로 삭제하시겠습니까?')){ return; }
    this._alertService.info('삭제 중 입니다');
    console.log(sc);
    return this._afs.doc(`SalesChannels/${sc.salesChannel_id}`).delete()
    .then(()=>{ this._alertService.success('성공'); return ;})
    .catch((err)=>{this._alertService.danger('실패 : '+err); console.log(err); return err;})
  }
  getSalesChannel(title:string){
    return this.getSalesChannels().pipe(map((scs:SalesChannel[])=> scs.find(sc => sc.title === title)));
  }
  getSalesChannels(){
    return this.salesChannels;
  }
}
