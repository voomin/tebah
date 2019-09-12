import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideosService {
  private videos:video[]=[
    {
      title:'바로톡, 죽음의 진실',
      sub:'바로톡 위기에 몰려 죽음에 처하게 되는데, 과연 그 진실은??',
      src:'https://www.youtube.com/embed/FPMW259Hn4c',
      link:'https://youtu.be/FPMW259Hn4c',
    },
    {
      title:'바로톡 영상',
      sub:'쓱, 싹, 톡 바로톡',
      src:'https://www.youtube.com/embed/qh3DJpz83Ts',
      link:'https://youtu.be/qh3DJpz83Ts',
    },
    {
      title:'바로톡 대형 설치영상',
      sub:'여유롭고, 차분하게 바로톡 대형 설치영상',
      src:'https://www.youtube.com/embed/SeCyAkXWe-Y',
      link:'https://youtu.be/SeCyAkXWe-Y',
    },
    {
      title:'바로톡 소형 설치영상',
      sub:'여유롭고, 차분하게 바로톡 소형 설치영상',
      src:'https://www.youtube.com/embed/o9MFZnrl5Q8',
      link:'https://youtu.be/o9MFZnrl5Q8',
    },
    
  ]
  constructor() { }
  getVideos(){
    return this.videos;
  }
  
}
interface video{
  title:string,
  sub:string,
  src:string,
  link:string,
}
