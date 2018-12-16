import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private passwordMatch: boolean = false;

  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              public af: AngularFireAuth,
              private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('',[
        Validators.required
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(5)
      ]),
      firstName: new FormControl('',[
        Validators.required
      ]),
      lastName: new FormControl('',[
        Validators.required
      ])
    });
  }

  get f() { 
    return this.registerForm.controls; 
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.af.auth.createUserWithEmailAndPassword(
      this.registerForm.value.username+'@coffeeapp.com',
      this.registerForm.value.password
    ).then(
      (success) => {
        this.af.auth.signOut();
        console.log(success);
        this.router.navigate(['/login']);
      }).catch(
        (err) => {
          console.log(err);
        }
      )
  }
}
