import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ManagementPointService } from 'src/app/services/admin/management-point.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.sass']
})
export class MyProfileComponent implements OnInit {
  public userWallet;
  constructor(
    public auth:AuthService,
    public _managementPoint:ManagementPointService,
    ) { }

  ngOnInit() {
    this.auth.user$.subscribe(u=>{
      if(u)
        this.userWallet = this._managementPoint.getUserWallet(u.uid);
    })
  }
  onDisplayNameChange(newDN, oldDN){
    this.auth.setDisplayName(newDN, oldDN);
  }

}
