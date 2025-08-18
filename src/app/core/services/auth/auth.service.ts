import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../enviroment/enviroment';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient ,private router :Router) {}
  userData:any;
  signUp(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/auth/signup`,
      data
    );
  }

  signIn(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/auth/signin`,
      data
    );
  }
  getUserData():void{
    
    this.userData = jwtDecode(localStorage.getItem('myToken')!)
    console.log(this.userData)

  }
  // sign out
  signOut(){
    localStorage.removeItem('myToken')
    this.userData=null 
    this.router.navigate(['/login'])
  }
}
