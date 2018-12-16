import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { User } from './User';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              public af: AngularFireAuth,
              private router: Router) { 
                this.af.auth.onAuthStateChanged(auth => {
                  if(auth){
                    this.router.navigate(['/dashboard/order']);
                  }
                })
              }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('',[
        Validators.required
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(5)
      ]),
    });
  }

  get f() { 
    return this.loginForm.controls; 
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    // this.af.auth.signInAndRetrieveDataWithCredential()

    let userData = new User(this.loginForm.value.username, this.loginForm.value.password);
    this.loginService.loginUser(userData);
  }

}
