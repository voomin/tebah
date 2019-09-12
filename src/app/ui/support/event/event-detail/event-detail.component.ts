import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { EventService } from 'src/app/services/support/event.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/services/support/comment.service';
import { Comment} from 'src/app/interfaces/comment';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.sass']
})
export class EventDetailComponent implements OnInit {
  public event:Observable<any>;
  public comments;
  eventId;
  registerForm: FormGroup;
  submitted = false;
  constructor(
    private _eventService : EventService,
    private _commentService : CommentService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder, 
    public auth: AuthService
  ) {
    this.route.params.subscribe(params=>this.eventId=params['id']);
  }
  get f() { return this.registerForm.controls; }
  ngOnInit() {
    this.event = this._eventService.getEvent(this.eventId);
    this.registerForm = this.formBuilder.group({
      comment: ['', [Validators.required, Validators.maxLength(999)]]
    });

    this.comments = this._commentService.getEventComments(this.eventId);
  }

  onCommentSubmit(uid,displayName){
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    //console.log(this.auth.userConnected());
    if(!uid){
      window.alert("회원이 아닙니다.");
      return;
    }

    var comment:Comment ={
      board_type:'event',//review or event
      board_id:this.eventId,
      from_uid: uid,
      from_displayName: displayName,
      content:this.registerForm.value['comment'],
      timestamp:new Date().getTime(),
      like:0,
      hate:0,
    };
    this._commentService.setComment(comment);

    
  }
}
