import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
// import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  readonly APIUrl = "http://127.0.0.1:8000/";

  registerUser(data:any){
    return this.http.post<any>(this.APIUrl + "auth/api/register/", data)
  }

  login(data:any):Observable<any>{
    return this.http.post<any>(this.APIUrl+"auth/api/login/", data).pipe(
      map(user=>{
        // var userDecode = jwt_decode(user.token)
        if (user && user.token) {
          localStorage.setItem("currentUser", user.token)
        }
        return user;
      })
    )
  }

  logout(){
    return this.http.post<any>(this.APIUrl+"auth/api/logout/", {"azzz":"azzz"})
  }
}
