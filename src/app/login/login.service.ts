import { Injectable } from '@angular/core';
import { User } from './User';
import { coffees } from '../data/coffee';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isLogged: boolean = false;

  constructor(private router: Router) { }

  loginUser(userData: User){
    // mock login service
    if(userData.username === 'admin' && userData.password === 'admin'){
      console.log('correct');
      this.isLogged = true;
      this.router.navigate(['/order']);
    }
  }

  isUserLogged(){
    return this.isLogged;
  }

}
