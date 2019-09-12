import { Component, OnInit } from '@angular/core';
import { FaqService } from 'src/app/services/support/faq.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.sass']
})
export class FaqComponent implements OnInit {
  public faqs = [];
  constructor(private _FaqService : FaqService) { }

  ngOnInit() {
    this.faqs = this._FaqService.getFaqs();
  }
}
