import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SalesChannel } from 'src/app/interfaces/sales-channel';
import { SalesChannelsService } from 'src/app/services/sales-channels.service';

@Component({
  selector: 'app-sales-channels',
  templateUrl: './sales-channels.component.html',
  styleUrls: ['./sales-channels.component.sass']
})
export class SalesChannelsComponent implements OnInit {
  public salesChannels;
  public selectSalesChannel:SalesChannel;

  constructor(
    public auth : AuthService,
    private _salesChannelService : SalesChannelsService
    ) { }

  ngOnInit() {
    this.salesChannels = this._salesChannelService.getSalesChannels();
  }
  onSalesChannel(sc:SalesChannel){ this.selectSalesChannel = sc; }
  onCreateChannel(title:string,type:string){ this._salesChannelService.setSalesChannel(title,type); }
  onDeleteChannel(){ this._salesChannelService.deleteSalesChannel(this.selectSalesChannel); }
  onUpdateChannel(){ this._salesChannelService.updateSalesChannel(this.selectSalesChannel); }
}

