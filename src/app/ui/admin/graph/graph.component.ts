import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GraphClientDataService } from 'src/app/services/admin/graph-client-data.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.sass']
})
export class GraphComponent implements OnInit {
  public clientData :any;
  constructor(
    public auth : AuthService,
    private _graphClientDataService : GraphClientDataService
  ) { }

  ngOnInit() {
    this.clientData = this._graphClientDataService.getClientData();
  }

}
