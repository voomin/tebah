import { Injectable } from '@angular/core';
import { PartnerStore } from 'src/app/interfaces/partner-store';
import { Observable } from 'rxjs' ;
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  partnerStoresCollection: AngularFirestoreCollection<PartnerStore[]>;
  partnerStores:Observable<any[]>;

  constructor(public _afs: AngularFirestore) {
    this.partnerStoresCollection = _afs.collection<any>("PartnerStore");
    this.partnerStores = this.partnerStoresCollection.snapshotChanges()
                  .pipe(
                      map(changes =>
                        changes.map(c => {
                          return ({ id: c.payload.doc.id, ...c.payload.doc.data()})
                        }
                    )));
  }
  getPartnerStore(id:string){
    return this.getPartnerStores().pipe(
      map((partnerStores:any[])=> partnerStores.find(partnerStore => partnerStore.id === id))
    );
  }
  getPartnerStores(){
    return this.partnerStores;
  }
}
