import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ManagementPointService } from 'src/app/services/admin/management-point.service';

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.sass']
})
export class PointComponent implements OnInit {
  public deployPoint;
  public rootWallet;
  public deployPointHistory;
  public pointTransactions;

  constructor(
    public auth : AuthService,
    private _managementPointService: ManagementPointService
    ) { }

  ngOnInit() {
    this.deployPoint = this._managementPointService.getDeployPoint();
    this.rootWallet = this._managementPointService.getRootWallet();
    this.deployPointHistory = this._managementPointService.getDeployPointHistory();
    this.pointTransactions = this._managementPointService.getPointTransactions();
  }
  onDeployPoint(point){
    this._managementPointService.setDeployPoint(point);
  }
  onSendPoint(fromUid,toUid,point){
    this._managementPointService.setPointTransaction(fromUid,toUid,point);
  }
}
