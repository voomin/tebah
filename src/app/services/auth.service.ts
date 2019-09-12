import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { User } from './../interfaces/user';

import { auth } from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AlertService } from 'ngx-alerts';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ : Observable<User>;

  constructor(
    private router: Router,
    private _location:Location,
    private afAuth:AngularFireAuth,
    private afs: AngularFirestore,
    private _alertService:AlertService
    ) {
      this.user$ = afAuth.authState.pipe(
        switchMap(user => {
          // Logged in
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            // Logged out
            return of(null);
          }
        })
      )
    }
  async googleLogin(){
    this._alertService.info('구글서버에 연결중..');
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    this._alertService.success('로그인 성공');
    this._location.back();
    return this.updateUserData(credential.user);
  }

  emailForgotPassword(email){
    this._alertService.info('메일 전송중입니다.');
    this.afAuth.auth.sendPasswordResetEmail(email)
      .then(()=>{
        this._alertService.success(email+' 주소로 비밀번호 설정 가능한 메일을 전송했습니다.');
      })
      .catch((err)=>{
        this._alertService.danger(`실패 : `+ this.getErrorMessage(err));
      })
    
  }
  emailSignUp(displayName,email,password){
    this._alertService.info('회원 정보를 검토 하고 있습니다.');
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then((user: auth.UserCredential)=>{
      this.updateUserData({
        uid: user.user.uid, 
        email: email, 
        displayName: displayName, 
        photoURL: ''
      });
      this._alertService.success('정상적으로 가입을 완료 했습니다. \n'+displayName+'님 환영합니다.');
      this._location.back();
    })
    .catch((err)=>{
      this._alertService.danger('회원가입에 실패했습니다 :'+this.getErrorMessage(err));
      console.log(err.code+" : "+err.message);
    })
    
  }
  async emailLogin(email,password){
    this._alertService.info('로그인 중..');
    await this.afAuth.auth.signInWithEmailAndPassword(email,password)
      .then((user)=>{ 
        this._alertService.success('로그인 성공');
        this._location.back();
        return this.updateUserData(user.user);
      })
      .catch((err)=>{ this._alertService.danger(this.getErrorMessage(err));  })
  }
  private getErrorMessage(err){
    var message = "";
    switch(err.code){
      case 'auth/user-not-found':
        message = "회원이 아닙니다. 또는 사용자가 삭제되었을 수 도 있습니다.";
        break;
      case 'auth/email-already-in-use':
        message = '이메일 주소는 이미 다른 계정에서 사용 중입니다.';
        break;
      case 'auth/invalid-email':
        message = '이메일 주소의 형식이 잘못되었습니다.';
        break;
      case 'auth/wrong-password':
        message = '비밀번호가 정확하지 않습니다.';
        break;
      default:
        message = err.code+" : "+err.message;
      break;
    }
    return message
  }
  private updateUserData(user:any) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data:any = { 
      email: user.email
    } 
    return userRef.set(data, { merge: true })

  }
  setDisplayName(newDN,oldDN){
    if(newDN===oldDN){
      this._alertService.warning('기존이름과 같습니다.');
      return
    }
    this._alertService.info('변경중..');
    const uid = this.afAuth.auth.currentUser.uid;
    return this.afs.doc(`users/${uid}`).set({displayName:newDN},{merge:true})
    .then(()=>{
      this._alertService.success('정상적으로 변경되었습니다.');
      return true;
    })
    .catch((err)=>{
      this._alertService.danger('변경 실패 : '+err);
      return false;
    });
  }
  async logOut(){
    await this.afAuth.auth.signOut();
    this._alertService.info('로그아웃 하였습니다.');
    this._location.back();
  }

}