import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  constructor(
    private auth:AuthService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          name: ['', Validators.required],
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
      this.auth.emailSignUp(
        this.registerForm.value.name,
        this.registerForm.value.email,
        this.registerForm.value.password,
      )

      //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  }

}
