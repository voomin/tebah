import { Injectable } from '@angular/core';
import { ServiceCenterEvent } from 'src/app/interfaces/event';
import { Observable } from 'rxjs' ;
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { AlertService } from 'ngx-alerts';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  eventsCollection: AngularFirestoreCollection<Event[]>;
  events:Observable<any[]>;
  loaded=false;

  constructor(
    public _afs: AngularFirestore,
    private _alertService:AlertService
    ) {
    this.eventsCollection = _afs.collection<Event>("ServiceCenterBoard").doc("events")
                              .collection('contain', ref => ref.orderBy('startDate','desc'));
    this.events = this.eventsCollection.snapshotChanges()
                  .pipe(
                      map(changes =>
                        changes.map(c => {
                          this.loaded=true;
                          return ({id:c.payload.doc.id, ...c.payload.doc.data()})
                        }
                    )));
  }
  updateEvent(e:ServiceCenterEvent){
    this._alertService.info('업데이트중..')
    console.log(e);
    return this._afs.doc(`ServiceCenterBoard/events/contain/${e.id}`)
      .update({
        title:e.title,
        sub_title:e.sub_title,
        finished:e.finished,
        content:e.content,
        startDate:e.startDate,
        endDate:e.endDate,
        imgSrc:e.imgSrc,
        link:e.link,
      })
      .then(()=>{ this._alertService.success('성공적으로 업데이트 되었습니다.'); return true;})
      .catch((err)=>{ this._alertService.danger('업데이트 실패 : '+err); return err;});
  }
  setEvent(inputEvent:any){
    this._alertService.info('생성중..');
    return this.eventsCollection.add(inputEvent)
      .then(()=>{ this._alertService.success('성공'); return; })
      .catch((err)=>{this._alertService.danger('실패 : '+err); return err;})
  }
  getEvent(id:string){
    return this.getEvents().pipe(
      map((events:ServiceCenterEvent[])=> events.find(event => event.id === id))
    );
  }
  getEvents(){
    return this.events;
  }
}
