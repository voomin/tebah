import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/support/event.service';
import { ServiceCenterEvent } from 'src/app/interfaces/event';

@Component({
  selector: 'app-event-mng',
  templateUrl: './event-mng.component.html',
  styleUrls: ['./event-mng.component.sass']
})
export class EventMngComponent implements OnInit {
  events;
  public selectEvent:ServiceCenterEvent;

  public inputTitle : string;
  public inputLink : string;
  public inputImgSrc :string;
  public inputSubTitle: string;
  public inputStartDate : string;
  public inputEndDate : string;
  public inputFinished : boolean = false;
  public inputContent : string;

  constructor(
    public auth : AuthService,
    private _eventServics : EventService
  ) { }

  ngOnInit() {
    this.events = this._eventServics.getEvents();
  }
  onEvent(event:ServiceCenterEvent){ this.selectEvent = event; }
  onEventUpdate(){ this._eventServics.updateEvent(this.selectEvent); }
  onEventAdd(){
    let inputEvent :ServiceCenterEvent = {
      title: this.inputTitle,
      sub_title: this.inputSubTitle,
      finished: this.inputFinished,
      content: this.inputContent,
      startDate: this.inputStartDate,
      endDate: this.inputEndDate,
      imgSrc: this.inputImgSrc,
      link: this.inputLink
    };
    this._eventServics.setEvent(inputEvent);
  }
}
