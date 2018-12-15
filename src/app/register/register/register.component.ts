import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private passwordMatch: boolean = false;

  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

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

    if(this.registerForm.value.password !== this.registerForm.value.passwordConfirm){
      console.log(this.registerForm.value.password , " : ", this.registerForm.value.passwordConfirm);
      this.passwordMatch = false;
      return;
    } else {
      this.passwordMatch = true;
    }

    if (this.registerForm.invalid) {
      return;
    }
    

    alert('SUCCESS!! :-)')
  }
}
