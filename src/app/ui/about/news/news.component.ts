import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/about/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.sass']
})
export class NewsComponent implements OnInit {
  public news=[];

  constructor(private _newsService:NewsService) { }

  ngOnInit() {
    this.news= this._newsService.getNews();
  }

}
