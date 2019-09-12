import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private news:newPost[] = [
    {
      title:'Lock & Lock 30파레트 입고',
      date:'2019년 4월 10일',
      imgSrc:'assets/img/news/KakaoTalk_20190410_115808246.jpg',
    },
    {
      title:'테바와 Lock & Lock 콜라보 협정',
      date:'2019년 4월 4일',
      imgSrc:'assets/img/news/KakaoTalk_20190404_135136464.jpg',
    },
    {
      title:'테바 금요일 피칭 대회',
      date:'2019년 3월 22일',
      imgSrc:'assets/img/20190322_080908694.jpg',
    },
    {
      title:'비오는날 테바 회식',
      date:'2019년 3월 21일',
      imgSrc:'assets/img/20190325_132203432.jpg',
    },
    {
      title:'계룡산에서 팀원들과 함께..',
      date:'2019년 3월 14일',
      imgSrc:'assets/img/20190325_132154963.jpg',
    },
    {
      title:'대전 창업포럼',
      date:'2019년 3월 7일',
      imgSrc:'assets/img/news-190307.jpg',
    },
    {
      title:'문재인 대통령과의 만남',
      date:'2019년 3월 6일',
      imgSrc:'assets/img/news-190306.jpg',
    },
    {
      title:'우리들의 단체 행사',
      date:'2019년 2월 25일',
      imgSrc:'assets/img/news-190225.jpg',
    },
    {
      title:'여성경제신문 인터뷰',
      date:'2019년 1월 22일',
      imgSrc:'assets/img/news-190122.jpg',
    },
    {
      title:'벤처창업진흥유공 시상식',
      date:'2018년 12월 11일',
      imgSrc:'assets/img/news-1802.jpg',
    },
    {
      title:'신세계 이마트 입점',
      date:'2017년 2월 1일',
      imgSrc:'assets/img/news-170201.jpg',
    },
  ]
  constructor() { }
  getNews(){
    return this.news;
  }
}
interface newPost{
  title: string,
  date: string,
  imgSrc: string, //img size 권장사항 400
}
