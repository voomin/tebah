import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs' ;
import { map } from 'rxjs/operators';
import { finalize } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { review } from 'src/app/interfaces/review';
import { AlertService } from 'ngx-alerts';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  reviewsCollection: AngularFirestoreCollection<any[]>;
  reviews:Observable<any[]>;

  constructor(
    private router: Router,
    public _afs: AngularFirestore,
    private _storage: AngularFireStorage,
    private _alertService:AlertService
    ) {
      this.reviewsCollection = _afs.collection<any>("ServiceCenterBoard").doc("reviews")
        .collection('contain', ref => ref.orderBy('timestamp','desc'));
      this.reviews = this.reviewsCollection.snapshotChanges()
        .pipe(map(changes =>changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data()}))));

  }
  reviewWrite(review : review,files: FileList){
    var reviewRef = this._afs.firestore.collection('ServiceCenterBoard').doc("reviews")
    .collection('contain');

    //[ firestore review insert START ]
    reviewRef.add(review).then((docRef)=>{
      this._alertService.info('업로드 중..');
      var docId = docRef.id;
      const file = files[0];
      const filePath = 'reviews/'+docId+'.jpg';
      const fileRef = this._storage.ref(filePath);
      const task = this._storage.upload(filePath,file);

      // observe percentage changes
      //let downloadURL = "";
      //const uploadPercent = task.percentageChanges();

      //[ storage review image START ]
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(downloadURL => {
              reviewRef.doc(docId).update({
              imgSrc:downloadURL
            }).then(()=>{console.log('성공적으로 업로드 하였습니다.');
              this._alertService.success('성공적으로 업로드 하였습니다.');
              this.router.navigate(['/reviews']);
            }).catch((err)=>{console.log(err);
              this._alertService.danger(err);
            })
          })
        })
      ).subscribe().closed
      //[ storage review image END ]
    });
    //[ firestore review insert END ]
  }

  getReviews(){return this.reviews;}
  deleteReview(rid:string){
    if(!confirm('정말로 후기를 삭제하시겠습니까?')){
      return ;
    }
    return this._afs.doc(`ServiceCenterBoard/reviews/contain/${rid}`).delete()
    .then(()=>{this._alertService.info('성공적으로 삭제되었습니다.');})
    .catch((err)=>{ this._alertService.danger(`실패 : ${err}`);})
  }
}
