import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(state.url === '/dashboard/order' || state.url === '/dashboard/statistics'){
        if(localStorage.getItem('token') !== '123456'){
          this.router.navigate(['/login']);
          return false;
        } else {
          return true;
        }
      } else if (state.url === '/login' || state.url === '/register'){
        if(localStorage.getItem('token')){
          this.router.navigate(['/dashboard/order']);
          return true;
        } else {
          return true;
        }
      } else {
        if(localStorage.getItem('token') !== '123456'){
          this.router.navigate(['/login']);
          return false;
        } else {
          this.router.navigate(['/dashboard/order']);
          return false;
        }
      }
      
    
  }
}
