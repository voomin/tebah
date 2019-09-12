import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private members = [
    {
      name: '최상필',
      position: '대표이사',
      introduction: `
      겸손을 갖고 있고, 제대로 된 앎을 갖고 있고, 그것을 바라봄을 가진 분.
      겸손을 갖고 있어 사람들이 찾아오고 기회를 주고 그렇게 신뢰를 쌓아가는 분.
      제대로 된 앎을 갖고 있어 지(知)식보다 지(智)식에 더 관심을 두는 분.
      그것을 충분히 바라봄으로써 계속해서 또 다른 기적을 만들어 가는 분.
      이렇게 우리가 이곳에서 만난 것이 기적인 것처럼
      그는 또 다른 기적을 만들어 갈 것이다.
      그래서 우리는 여기에 모였다. 이분과 같은 꿈을 꾸며 걸어가기 위해..
      `,
      mail: 'pil6038@naver.com',
      imageUrl: 'assets/img/member_01.jpg',
    },
    {
      name: '윤용철',
      position: '전무이사',
      introduction: `
      (주)테바에서 가장 재미있는 곳은? 이분이 머무는 곳.
      이분의 머릿속에 잠시 들어갔다 오면 놀랍다!!!
      머릿속에 보물을 숨겨 놓았다.
      아무도 만질 수 없는 보물을 갖고 있고, 그분이 꺼내 놓았을 때만 우리는 볼 수 있고 만질 수 있다.
      머릿속이 보물창고인 분.
      (주)테바의 보물을 만드는 분.
      `,
      mail: 'freeyc@naver.com',
      imageUrl: 'assets/img/member_02.jpg',
    },
    {
      name: '허수학',
      position: '연구소장',
      introduction: `
      (주)테바의 연구는 이분이 한다.
      둥글둥글한 큰 체격만큼 지식도 가득하다.
      그 다양한 지식들을 우리에게 다 공유해 주고 있다.
      공유란 참 좋은 것이다.
      `,
      mail: 'cableshh@naver.com',
      imageUrl: 'assets/img/member_03.jpg',
    },
    {
      name: '이길주',
      position: '경영지원팀 이사',
      introduction: `
      이인자다. 곳간을 담당한다.
      호탕하고 유쾌하다.
      이분이 없으면 금세 구멍이 난다.
      그러니 너무 멀리 가지 마라. 
      말하지 않아도 마음은 기다린다.
      `,
      mail: 'lgj1123@daum.net',
      imageUrl: 'assets/img/member_04.jpg',
    },
    {
      name: '손기웅',
      position: '영업팀 이사',
      introduction: `
      사람을 좋아한다. 사람들과의 사이를 좋아한다.
      사이시옷의 시옷처럼 어디서든 어울림을 만들어 낼 수 있는 분.
      어디서든 조화를 만들어 갈 수 있는 분.
      그래서 꽃 피울 수 있는 분.
      `,
      mail: 'skw332@naver.com',
      imageUrl: 'assets/img/member_05.jpg',
    },
    {
      name: '권지희',
      position: '경영지원팀 과장',
      introduction: `
      삼방미인이다. 다섯 개 밖에 빠지지 않았다.
      기획력과 추진력이 있다. 가끔.
      지혜롭다. 가끔.
      성격이 좋다. 가끔.
      이렇게 다 갖추었다. 정말 완벽하다.
      `,
      mail: 'jhkwon3737@naver.com',
      imageUrl: 'assets/img/member_06.jpg',
    },
    {
      name: '박현용',
      position: '생산팀 매니저',
      introduction: `
      능력자다. 아내가 상당한 미인이다. 그리고 이제 세 아이의 아빠다.
      그것으로 이미 그는 세상을 평정했고, (주)테바의 생산라인을 평정했다.
      다른 곳에 가지 말고 (주)테바와 함께 끝까지 걸어갔으면 한다.
      “어디로 가끔 혼자 떠나고 싶을 때가 있나요? 그때 생각하세요. 세 아이의 아빠인 것을..”
      그대는 떠날 수 없다. (주)테바도 마찬가지다.
      `,
      mail: 'hyunyongp@naver.com',
      imageUrl: 'assets/img/member_07.jpg',
    },
    {
      name: '김샛별',
      position: '경영지원팀 사원',
      introduction: `
      삼인자다. 이분도 곳간을 담당한다.
      젊다. 톡톡튄다. 신선하다. 
      이제 됐다. 밥은 안 굶기겠지??
      `,
      mail: 'byeol121@naver.com',
      imageUrl: 'assets/img/member_08.jpg',
    },
    {
      name: '김부민',
      position: '웹 개발자',
      introduction: `
      "하면 된다"
      `,
      mail: 'bm33728090@gmail.com',
      imageUrl: 'assets/img/member_09.jpg',
    },
    {
      name: '이정은',
      position: '디자이너',
      introduction: `
      조용하다. 조용하고 또 조용하다.
      고요하다. 고요하고 또 고요하다.
      항상 눈은 모니터를 향해 있다.
      디자이너들은 누군가 모르는 고도의 집중이 필요하나 보다.
      그래서 이 분은 항상 음소거의 모습으로 있다.
      “쉿!! 지금은 고도의 집중력을 요하는 시간입니다. 잠시 핸드폰을 무음으로 바꿔주시기 바랍니다.”
      `,
      mail: 'sssg75099@gmail.com',
      imageUrl: 'assets/img/member_10.jpg',
    },
  ];
  constructor() { }
  getMembers() {
    return this.members;
  }
}
