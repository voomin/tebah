import { Component, Pipe,  OnInit } from '@angular/core';
import { VideosService } from 'src/app/services/about/videos.service';

@Pipe({ name: 'safe' })

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.sass']
})
export class VideosComponent implements OnInit {
  public videos=[];

  constructor(private _videosService:VideosService) { }

  ngOnInit() {
    this.videos=this._videosService.getVideos();
  }

}
