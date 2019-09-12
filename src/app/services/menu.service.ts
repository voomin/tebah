import { Injectable } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})

export class MenuService {
  private menus = [
    {
      title : '회사소개',
      list : [
        {title : '우리의 이야기', link : 'about'},
        {title : '우리의 가치', link : 'value'},
        {title : '우리가 걸어가는 길', link : 'history'},
        {title : '우리의 CI', link : 'CI'},
        {title : '우리의 IR', link : 'IR'},
        {title : '우리의 소식', link : 'news'},
        {title : '동영상', link : 'videos'}
      ]
    },
    {
      title : '제품소개',
      list : [
        {title : '어떻게 만들까?', link : 'making'},
        {title : '우리의 제품', link : 'products'},
        {title : '어디서 살까?', link : 'where'}
      ]
    },
    {
      title : '고객지원',
      list : [
        {title : '고객후기', link : 'reviews'},
        {title : '자주 묻는 질문', link : 'faq'},
        {title : '이벤트', link : 'event'}
      ]
    }
  ];
  private linkTitle={
    about:'우리의 이야기',
    value:'우리의 가치',
    history:'우리가 걸어가는 길',
    CI:'CI',
    IR:'IR',
    news:'우리의 소식',
    products:'우리의 제품',
    making:'어떻게 만들까?',
    barotok:'바로톡',
    barotok_filter:'거름망',
    barotok_filter_s:'거름망',
    barotok_F:'거름망 에프',
    barotok_F_s:'거름망 에프',
    barotok_cover:'커버',
    barotok_smile:'스마일',
    barotok_hole:'홀인원',
    barotok_dispenser:'디스펜서',
    barotok_dispenser_s:'디스펜서',
    where:'어디서 살까?',
    where_on:'온라인 쇼핑몰',
    where_off:'오프라인 매장',
    reviews:'고객후기',
    review_write:'후기 작성하기',
    faq:'자주묻는질문',
    event:'이벤트',
    videos:'동영상',
    signUp:'회원가입',
    login:'로그인',
    forgot:'비밀번호 찾기',
    my:'내정보',
    mall:'테바몰',
  }
  constructor(
    private title:Title) { }
  setTitle(){
    var pathname = window.location.pathname;
        pathname = pathname.replace("/", ""); 
        pathname = pathname.replace(/\//gi, "_"); 
    //console.log(pathname);
    var title = this.linkTitle[pathname];

    if(!title)
      title = "Tebah";
    else
      title = title+" - Tebah";

    this.title.setTitle(title);
    //return title;;
  }
  getMenu(index:number){
    return this.menus[index];
  }
  getMenus(){
    return this.menus;
  }
}