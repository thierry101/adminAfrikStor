import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommandsService {

  constructor(private http: HttpClient) { }


  //**************************** get all client users ***********************************
  getClientUsers(): Observable<any[]> {
    return this.http.get<any[]>(environment.API + '/api/get-client-users/')
  }

  //**************************** get all category ***********************************
  getCoupons(): Observable<any[]> {
    return this.http.get<any[]>(environment.API + '/api/get-all-coupons/')
  }


  creatCoupon(data: any): Observable<any> {
    return this.http.post<any>(environment.API + '/api/get-all-coupons/', data)
  }

  // ************************* get all commands *************************************
  getCommands(): Observable<any> {
    return this.http.get<any>(environment.API + '/api/get-all-orders/')
  }

  //  ************************ to send amount delivrevry ****************************
  sendAmtDelevery(id: any, data: any): Observable<any> {
    return this.http.put<any>(environment.API + '/api/order-detail/' + id + '/', data)
  }

  // ************************* get all commands *************************************
  getMessages(): Observable<any> {
    return this.http.get<any>(environment.API + '/api/retrieve-message/')
  }

  //  ************************ to send new statut of message ****************************
  sendNewState(id: number, data: any): Observable<any> {
    return this.http.put<any>(environment.API + '/api/update-message/' + id + '/', data)
  }
}

