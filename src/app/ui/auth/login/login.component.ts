import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  logining = false;

  constructor(
    public auth:AuthService,
    private formBuilder: FormBuilder,
    private router : Router,
    ) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }
      this.logining = true;
      this.auth.emailLogin(this.registerForm.value.email,
                        this.registerForm.value.password)
                        .then(()=>{
                          this.logining = false;
                        })
                        
      // this.auth.emailLogin(this.registerForm.value.email,
      //                 this.registerForm.value.password,
      //                 function(err){
      //                   if(err) 
      //                     alert(err);
      //                   else{
      //                     console.log('로그인 성공');
      //                     this.router.navigate(['/']);
      //                   }
      //                 });
  }

}
