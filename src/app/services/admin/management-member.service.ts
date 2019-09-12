import { Injectable } from '@angular/core';
import { Observable } from 'rxjs' ;
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';
import { AlertService } from 'ngx-alerts';

@Injectable({
  providedIn: 'root'
})
export class ManagementMemberService {
  private membersCollection : AngularFirestoreCollection<any[]>;
  private members : Observable<any[]>;
  constructor(
    public _afs: AngularFirestore,
    private _alertService:AlertService,
  ) {
    this.membersCollection = _afs.collection(`users`, ref => ref.orderBy('create_timestamp','desc'));
    this.members = this.membersCollection.snapshotChanges()
      .pipe( map(changes =>changes.map(c => ({...c.payload.doc.data()}))) );
  }
  getMembers(){
    return this.members;
  }
  administratorRights(uid:string){
    this._alertService.info('관리자 권한 부여중..');
    return this._afs.doc(`AdminData/admin/admins/${uid}`).set({
      uid:uid,
      createTime:new Date().getTime(),
    },{merge:true})
    .then(()=> this._alertService.success('성공적으로 업데이트 했습니다.'))
    .catch((err)=> this._alertService.danger(`업데이트 실패 : `+err))
  }
  administratorLefts(uid:string){
    this._alertService.info('관리자 권한 삭제중..');
    return this._afs.doc(`AdminData/admin/admins/${uid}`).delete()
    .then(()=> this._alertService.success('성공적으로 업데이트 했습니다.'))
    .catch((err)=> this._alertService.danger(`업데이트 실패 : `+err))
  }
  updateMember(u:User){
    if(!u || !u.uid){
      return;
    }
    this._alertService.info('업데이트 준비중..');
    return this._afs.doc(`users/${u.uid}`).set({
      rating_name: u.rating_name,
      displayName: u.displayName
    },{ merge: true})
    .then(()=> this._alertService.success('성공적으로 업데이트 했습니다.'))
    .catch((err)=> this._alertService.danger(`업데이트 실패 : `+err))
  }
}
