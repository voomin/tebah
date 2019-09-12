import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ReviewService } from 'src/app/services/support/review.service';
import { review } from 'src/app/interfaces/review';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-review-write',
  templateUrl: './review-write.component.html',
  styleUrls: ['./review-write.component.sass']
})
export class ReviewWriteComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  uploading = false;
  private user:User=null;
  constructor(
    public _auth: AuthService,
    private formBuilder: FormBuilder, 
    private _reviewService: ReviewService
    ) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          //displayName: ['', Validators.required],
          reviewTitle: ['', Validators.required],
          uploadImg: ['', Validators.required],
          content: ['', [Validators.required, Validators.maxLength(999)]]
      });
      this._auth.user$.subscribe(u=>{
        if(u) this.user=u;
      });
  }

  get f() { return this.registerForm.controls; }

  onSubmit(files: FileList) {
      this.submitted = true;

      if (this.registerForm.invalid) {
        return;
      }
      this.uploading = true;

      let review:review = {
        answer: false,
        author_id: this.user.uid,
        content: this.registerForm.value['content'],
        display_name: this.user.displayName, //this.registerForm.value['displayName'],
        thumb_imgSrc: '',
        imgSrc: '',
        timestamp: new Date().getTime(),
        title: this.registerForm.value['reviewTitle'],
        view: 0,
      }
      this._reviewService.reviewWrite(review,files);
  }
}


// const path = 'reviews/thumb_'+docId+'.jpg';
//               const reivewStorageRef = this._storage.ref(path);
//               console.log("download URL = "+JSON.stringify(downloadURL));
//               reivewStorageRef.getDownloadURL().subscribe(thumb_downloadURL => {
//                 reviewRef.doc(docId).update({
//                   imgSrc:downloadURL,
//                   thumb_imgSrc:thumb_downloadURL,
//                 }).then(()=>{
//                   console.log('성공적으로 업로드 하였습니다.');
//                 }).catch((err)=>{
//                   console.log(err);
//                 })
//               }).closed;