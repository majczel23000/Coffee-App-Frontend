import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private passwordMatch: boolean = false;

  constructor() { }

  registerForm = new FormGroup({
    username: new FormControl('',[
      Validators.required
    ]),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(5)
    ]),
    passwordConfirm: new FormControl('',[
      Validators.required,
      Validators.minLength(5)
    ])
  });

  ngOnInit() {
  }

  onSubmit() {
    if(this.registerForm.value.password != this.registerForm.value.passwordConfirm){
      this.passwordMatch = false;
      alert('Different passwords. Please type in exactly the same passwords!')
    } else{
      this.passwordMatch = true;
    }
  }
}
