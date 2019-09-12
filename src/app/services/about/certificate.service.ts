import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  public certificates = [
    {
      title: '우리의 기술',
      list:[
        { src: 'assets/img/award-01.jpg', title: '벤처기업인증' },
        { src: 'assets/img/award-02.jpg', title: '기업부설연구소인증' },
        { src: 'assets/img/award-03.jpg', title: '지식재산경영인증'},
        { src: 'assets/img/award-04.jpg', title: '혁신기업인증'},
        { src: 'assets/img/award-11.jpg', title: '직무발명보상우수기업인증'},
        { src: 'assets/img/award-05.jpg', title: '초파리회피시험성적서'},
      ]
    },
    {
      title: '우리의 수상',
      list:[
        { src: 'assets/img/award-07.jpg', title: '농림축산식품부장관상' },
        { src: 'assets/img/award-08.jpg', title: '이달의으뜸증기제품 선정' },
        { src: 'assets/img/award-09.jpg', title: '고객이 신뢰하는 브랜드 대상'},
        { src: 'assets/img/award-10.jpg', title: 'HIT500사업 선정'},
        { src: 'assets/img/award-12.jpg', title: '중소벤처기업부장관 표창장'},
      ]
    },
    {
      title: '우리의 지식재산',
      list:[
        { src: 'assets/img/patent-01.jpg', title: '제 10-1611396호' },
        { src: 'assets/img/patent-011.jpg', title: '제 10-1653621호' },
        { src: 'assets/img/patent-012.jpg', title: '제 10-1769128호' },
        { src: 'assets/img/patent-013.jpg', title: '제 10-1897750호' },
        { src: 'assets/img/patent-02.jpg', title: '제 10-1898883호' },
        { src: 'assets/img/patent-03.jpg', title: '제 10-1941897호' },
        { src: 'assets/img/patent-09.jpg', title: '제 30-0835526호' },
        { src: 'assets/img/patent-10.jpg', title: '제 30-0842390호' },
        { src: 'assets/img/patent-11.jpg', title: '제 30-0906006호' },
        { src: 'assets/img/patent-12.jpg', title: '제 30-0956815호' },
        { src: 'assets/img/patent-13.jpg', title: '제 30-0969428호' },
        { src: 'assets/img/patent-14.jpg', title: '제 30-0972951호' },
        { src: 'assets/img/patent-15.jpg', title: '제 30-0972952호' },
        { src: 'assets/img/patent-16.jpg', title: '제 30-0972953호' },
        { src: 'assets/img/patent-17.jpg', title: '제 30-0984361호' },
        { src: 'assets/img/patent-18.jpg', title: '제 30-0984362호' },
        { src: 'assets/img/patent-04.jpg', title: '제 40-1182171호' },
        { src: 'assets/img/patent-05.jpg', title: '제 40-1182173호' },
        { src: 'assets/img/patent-06.jpg', title: '제 40-1269158호' },
        { src: 'assets/img/patent-07.jpg', title: '제 40-1361656호' },
        { src: 'assets/img/patent-08.jpg', title: '제 40-1428102호' },
        { src: 'assets/img/patent-19.jpg', title: 'ZL. 2016 2 0831160, 5' },
        { src: 'assets/img/patent-geniebag.jpg', title: 'JP. 6017212' },
      ]
    },
  ];  
  constructor() { }
  getCertificates() {
    return this.certificates;
  }
}
