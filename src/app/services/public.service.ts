import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Iadvert, IconfigRule, Iprovider, IsettingSite } from '../interfaces/ipublic';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  changeTitleForCat: boolean = false;
  changeTitleForSubCat: boolean = false;
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(private http: HttpClient) { }

  //******************************** get setting site ***********************************
  getSettingSite(): Observable<IsettingSite> {
    return this.http.get<IsettingSite>(environment.API + '/api/setting-site/', { withCredentials: true })
  }

  //******************************** save setting site ***********************************
  settingSite(data: {}): Observable<IsettingSite> {
    return this.http.put<IsettingSite>(environment.API + '/api/setting-site/', data, { withCredentials: true })
  }

  //******************************** getrule for seller ***********************************
  getRuleSeller(): Observable<IconfigRule> {
    return this.http.get<IconfigRule>(environment.API + '/api/get-confidentiality-rules/')
  }

  //******************************** get confidentiality and rule ***********************************
  getConfigRule(): Observable<IconfigRule> {
    return this.http.get<IconfigRule>(environment.API + '/api/confidentiality-rules/', { withCredentials: true })
  }

  //******************************** save confidentiality and rule ***********************************
  configRule(data: {}): Observable<IconfigRule> {
    return this.http.put<IconfigRule>(environment.API + '/api/confidentiality-rules/', data, { withCredentials: true })
  }


  // /////////////////////////////// ABOUT PROVIDER /////////////////////////////////////////////////////////
  //******************************** get all provider ***********************************
  getProviders(): Observable<Iprovider> {
    return this.http.get<Iprovider>(environment.API + '/api/provider/', { withCredentials: true })
  }

  //******************************** save provider ***********************************
  // provider(data: Iprovider): Observable<Iprovider> {
  //   return this.http.post<Iprovider>(environment.API + '/api/provider/', data, { withCredentials: true })
  // }

  //******************************** edit provider ***********************************
  editProvider(id: number, data: any): Observable<any> {
    return this.http.put<any>(environment.API + '/api/provider/' + id + '/', data)
  }

  //  ******************************* delete Provider *******************************************
  delProvider(id: number): Observable<string> {
    return this.http.delete<string>(environment.API + '/api/provider/' + id + '/', { withCredentials: true })
  }

  //******************************** save advert ***********************************
  advert(data: Iadvert): Observable<Iadvert> {
    return this.http.post<Iadvert>(environment.API + '/api/show-add-advert/', data, { withCredentials: true })
  }

  //******************************** get all adverts ***********************************
  getAdverts(): Observable<Iadvert> {
    return this.http.get<Iadvert>(environment.API + '/api/show-add-advert/', { withCredentials: true })
  }

  //******************************** edit provider ***********************************
  editadvert(id: number, data: any): Observable<Iadvert> {
    return this.http.put<Iadvert>(environment.API + '/api/show-add-advert/' + id + '/', data)
  }

  //  ******************************* delete Provider *******************************************
  delAdvert(id: number): Observable<string> {
    return this.http.delete<string>(environment.API + '/api/show-add-advert/' + id + '/', { withCredentials: true })
  }

  //******************************** save advert ***********************************
  sendBlog(data: any): Observable<any> {
    return this.http.post<any>(environment.API + '/api/blog/', data, { withCredentials: true })
  }

  //******************************** get all blogs ***********************************
  getBlogs(): Observable<any> {
    return this.http.get<any>(environment.API + '/api/blog/', { withCredentials: true })
  }

  //******************************** edit provider ***********************************
  editBlog(id: number, data: any): Observable<any> {
    return this.http.put<any>(environment.API + '/api/edit-blog/' + id + '/', data)
  }

  //******************************** get all blogs ***********************************
  getAllVIsitors(): Observable<any> {
    return this.http.get<any>(environment.API + '/count-visitors/', { withCredentials: true })
  }

}
