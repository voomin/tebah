import { Component, OnInit } from '@angular/core';
import * as XLSX from 'ts-xlsx';
import { AutoProductComponentService } from 'src/app/services/admin/auto-product-component.service';

@Component({
  selector: 'app-online-order-insert',
  templateUrl: './online-order-insert.component.html',
  styleUrls: ['./online-order-insert.component.sass']
})
export class OnlineOrderInsertComponent implements OnInit {
  private arrayBuffer:any;
  private file:File;

  public excs;
  public orderArray = [];

  constructor(
    private _APCService : AutoProductComponentService,
  ) { }

  ngOnInit() {
    this.excs = this._APCService.getExcelColumns();
  }
  
  incomingfile(event) { this.file= event.target.files[0]; this.Upload();}
  private Upload() {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
        this.arrayBuffer = fileReader.result;
        const data = new Uint8Array(this.arrayBuffer);
        const arr = new Array();
        for(let i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        const bstr = arr.join("");
        const workbook = XLSX.read(bstr, {type:"binary"});
        const first_sheet_name = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[first_sheet_name];
        this.orderArray = XLSX.utils.sheet_to_json(worksheet,{raw:true});
    }
    fileReader.readAsArrayBuffer(this.file);
  }
  public onOrdersWating(){
    this.orderArray.forEach(o=>{
      this._APCService.setWaingOrder(o);
    })
  }
}
