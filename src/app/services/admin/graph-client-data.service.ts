import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GraphClientDataService {

  private basePath : string = '/ClientData';

  //ClinetDatas: FirebaseListObservable<ClientData[]>;

  constructor(
  ) { 
  }
  getClientData(){
  }
}
