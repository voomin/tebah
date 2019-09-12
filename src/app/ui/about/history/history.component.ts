import { Component, OnInit } from '@angular/core';
import { HistoryService } from 'src/app/services/about/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.sass']
})
export class HistoryComponent implements OnInit {
  public history=[];

  constructor(private _historyService : HistoryService) { }

  ngOnInit() {
    this.history = this._historyService.getHistory();
  }

}
