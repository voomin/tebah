import { Component, OnInit } from '@angular/core';
import { CertificateService } from '../../../services/about/certificate.service';
@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.sass']
})
export class ValueComponent implements OnInit {
  public certificates = [];

  constructor(private _certificateService : CertificateService) { }

  ngOnInit() {
    this.certificates = this._certificateService.getCertificates();
  }

}
