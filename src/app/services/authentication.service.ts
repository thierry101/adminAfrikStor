import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ipublic } from '../interfaces/ipublic';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import jwt_decode from "jwt-decode";
const TOKEN_KEY = 'auth-token';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  register(data: Ipublic): Observable<Ipublic> {
    return this.http.post<Ipublic>(environment.API + '/api/register/', data)
  }

  registerSeller(data: any): Observable<any> {
    return this.http.post<any>(environment.API + '/api/register-seller/', data)
  }

  login(data: Ipublic): Observable<Ipublic> {
    return this.http.post<Ipublic>(environment.API + '/api/login/', data) //, { withCredentials: true }
  }

  get isLoggedIn(): boolean {
    const token = window.localStorage.getItem('authToken')
    return token !== null || '' ? true : false
  }

  getRole() {
    const token = window.localStorage.getItem('authToken');
    var decoded = jwt_decode(token!);
    return Object(decoded)['role']
  }

  // retrieve all users
  user(): Observable<Ipublic> {
    return this.http.get<Ipublic>(environment.API + '/api/user/', { withCredentials: true })
  }

  refresh(token: any) {
    return this.http.post(environment.API + '/api/refresh/', token, { withCredentials: true })
  }

  logout(token: any) {
    return this.http.post(environment.API + '/api/logout/', token)
  }

  // use to send email for reset password
  forgot(data: object) {
    return this.http.post(environment.API + '/api/forgot/', data)
  }

  // use to set a new password
  reset(data: object) {
    return this.http.post(environment.API + '/api/reset/', data)
  }

  getUsers(): Observable<Ipublic> {
    return this.http.get<Ipublic>(environment.API + '/api/register/')
  }

  //******************************** edit user ***********************************
  editUser(id: number, data: any): Observable<Ipublic> {
    return this.http.put<Ipublic>(environment.API + '/api/register/' + id + '/', data)
  }

  //  ******************************* delete user *******************************************
  delUser(id: number): Observable<string> {
    return this.http.delete<string>(environment.API + '/api/register/' + id + '/')
  }
}
