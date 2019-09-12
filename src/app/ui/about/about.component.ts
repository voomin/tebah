import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/about/member.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})
export class AboutComponent implements OnInit {
  public members = [];
  constructor(private _memberService : MemberService) { }

  ngOnInit() {
    this.members = this._memberService.getMembers();
  }

}
