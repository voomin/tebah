import { Injectable } from '@angular/core';
import { Observable } from 'rxjs' ;
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Comment} from 'src/app/interfaces/comment';
import { AlertService } from 'ngx-alerts';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  commentsCollection: AngularFirestoreCollection<Comment>;
  comments:Observable<any[]>;
  loaded=false;

  constructor(
    public _afs: AngularFirestore,
    private _alertService:AlertService
    ) {
    this.commentsCollection = _afs.collection<Comment>("ServiceCenterBoard").doc("comment")
                              .collection('comments', ref => ref.orderBy('timestamp','desc'));
    this.comments = this.commentsCollection.snapshotChanges()
                  .pipe(
                      map(changes =>
                        changes.map(c => {
                          this.loaded=true;
                          return ({...c.payload.doc.data()})
                        }
                    )));
  }
  setComment(comment:Comment){
    this._alertService.info('업로드 중..');
    return this.commentsCollection.add(comment)
    .then(()=>{this._alertService.success('성공적으로 업로드 하였습니다.');})
    .catch((err)=>{this._alertService.danger('댓글 작성 실패 : '+err);})
  }

  getEventComments(board_id:string){
    var board_type ='event'
    var arr = [];
    return this.getcomments().pipe(
      map((comments:Comment[])=> comments.filter(comment => (
        comment.board_type === board_type 
        && comment.board_id === board_id 
        ))));
  }
  getcomments(){
    return this.comments;
  }
}
