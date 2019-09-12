import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.sass']
})
export class ForgotPasswordComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private auth:AuthService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
      });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      if (this.registerForm.invalid) {
          return;
      }
      var email = this.registerForm.value.email;
      //alert(`'${email}' 주소로 수정가능한 링크 전송하였습니다.`);
      this.auth.emailForgotPassword(email);
  }

}
