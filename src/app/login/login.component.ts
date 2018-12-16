import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap} from 'rxjs/operators';

interface User {
  uid: string;
  username: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Observable<User>;
  loginForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              public af: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) { 
                // this.af.auth.onAuthStateChanged(auth => {
                //   if(auth){
                //     this.router.navigate(['/dashboard/order']);
                //   }
                // })
                this.user = this.af.authState.pipe(
                  switchMap(user => {
                    if (user) {
                      return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
                    } else {
                      return of(null)
                    }
                  })
                )
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

    this.af.auth.signInAndRetrieveDataWithEmailAndPassword(
      this.loginForm.value.username+'@coffeeapp.com',
      this.loginForm.value.password
    ).then(
    (success) => {
      console.log(success);
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${success.user.email}`);
      const data: User = {
        uid: success.user.email,
        username: this.loginForm.value.username
      }
      userRef.set(data, { merge: true });
      localStorage.setItem('token','123456');
      this.router.navigate(['/dashboard/order']);
    }).catch(
      (err) => {
        console.log(err);
      }
    )
    // let userData = new User(this.loginForm.value.username, this.loginForm.value.password);
    // this.loginService.loginUser(userData);
  }

}
