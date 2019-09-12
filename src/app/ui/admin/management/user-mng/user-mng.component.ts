import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ManagementMemberService } from 'src/app/services/admin/management-member.service';
import { User } from 'src/app/interfaces/user';
import { ManagementPointService } from 'src/app/services/admin/management-point.service';
import { map } from 'rxjs/operators';
import { userPointWallet } from 'src/app/interfaces/point';

@Component({
  selector: 'app-user-mng',
  templateUrl: './user-mng.component.html',
  styleUrls: ['./user-mng.component.sass']
})
export class UserMngComponent implements OnInit {
  public members;
  public rootWallet;
  public selectUser:User;
  public selectUserWallet;
  public inputPoint = 0;

  constructor(
    public auth : AuthService,
    private _managementMemberService : ManagementMemberService,
    private _managementPointService : ManagementPointService
  ) { }

  ngOnInit() {
    this.members = this._managementMemberService.getMembers();
    this.rootWallet = this._managementPointService.getRootWallet();
  }

  onMemberInfo(user:User){
    this.selectUser = user;
    this.selectUserWallet = this._managementPointService.getUserWallet(user.uid);
  }
  onSendPoint(fromUid:string){
    const toUid = this.selectUser.uid;
    this._managementPointService.setPointTransaction(fromUid,toUid,this.inputPoint);
  }
  onUpdateUser(){
    this._managementMemberService.updateMember(this.selectUser);
  }
  onAdministratorRights(uid:string){ this._managementMemberService.administratorRights(uid); }
  onAdministratorLefts(uid:string){ this._managementMemberService.administratorLefts(uid); }
  // getUserWallet(uid:string){
  //   return this._managementPointService.getUserWallet(uid);
  // }
}
