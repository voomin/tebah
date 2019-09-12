import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideMenuService {
  private sideMenu = [
    {
      title:'거름망',
      list:[
        {title: '거름망 (대)', link: '/barotok/filter'},
        {title: '거름망 (소)', link: '/barotok/filter-s' },
        {title: '거름망 에프 (대)', link: '/barotok/F' },
        {title: '거름망 에프 (소)', link: '/barotok/F-s' },
      ]
    },
    {
      title:'커버',
      list:[
        {title: '커버 삐에로(대)', link: '/barotok/cover' },
        {title: '커버 스마일(소)', link: '/barotok/smile' },
        {title: '커버 홀인원(소)', link: '/barotok/hole' },
      ]
    },
    {
      title:'디스펜서',
      list:[
        {title: '디스펜서 (대)', link: '/barotok/dispenser' },
        {title: '디스펜서 (소)', link: '/barotok/dispenser-s' },
      ]
    },
  ];
  constructor(
    
  ) {
    
  }
  getSideMenu(){
    return this.sideMenu;
  }
  public getBarotokPiDorNull(){
    let pathname = window.location.pathname;
    let pid = null;
    switch(pathname){
      // case '/barotok/F': pid = 'C0BqtFlsXVsyCnVln6XJ'; break;
      // case '/barotok/F-s': pid = '0tY8pxkcMjpixIfBbUsr'; break;
      case '/barotok/filter': pid = 'LB13ASA2RAqvFgz3BzsI'; break;
      case '/barotok/filter-s': pid = 'sPPxpL1Iyr0Ar7AKBW6X'; break;
      case '/barotok/cover': pid = 'gEzrDIaK3CMk2pznh198'; break;
      case '/barotok/smile': pid = 'KkdN8G5H7qk92uo5dzpc'; break;
      case '/barotok/hole': pid = 'sxqL2WOaeb70m2xrNWmG'; break;
      case '/barotok/dispenser': pid = 'i8C4ClSvb4Ga3Ic1hLBg'; break;
      case '/barotok/dispenser-s': pid = 'v9ZwYz44nEYJvTdhPJkv'; break;
    }
    return pid;
  }
}
