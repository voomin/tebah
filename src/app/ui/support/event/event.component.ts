import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/support/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.sass']
})
export class EventComponent implements OnInit {
  public events;
  constructor(private _eventService:EventService) { }

  ngOnInit() {
    this.events = this._eventService.getEvents()
  }

}
