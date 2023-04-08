import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ibrand, Icategory, Iproduct, Isize, ISubcategory } from '../interfaces/ipublic';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  // ///////////////////////////////////////////////////////////// BEGIN CATEGORY ///////////////////////////////////////
  //**************************** get all category ***********************************
  getCategory(): Observable<Icategory[]> {
    return this.http.get<Icategory[]>(environment.API + '/api/category/')
  }

  //******************************** save category ***********************************
  category(data: Icategory): Observable<Icategory> {
    return this.http.post<Icategory>(environment.API + '/api/category/', data)
  }

  //******************************** edit category ***********************************
  editCategory(id: number, data: Icategory): Observable<Icategory> {
    return this.http.put<Icategory>(environment.API + '/api/category/' + id + '/', data)
  }

  // *********************************** change the state of category from the table ***********************
  editStateCategory(id: number, data: {}): Observable<Icategory> {
    return this.http.put<Icategory>(environment.API + '/api/category/' + id + '/', data)
  }

  //  ******************************* delete category *******************************************
  delCategory(id: number): Observable<string> {
    return this.http.delete<string>(environment.API + '/api/category/' + id + '/')
  }
  // ///////////////////////////////////////////////////////////// END CATEGORY ///////////////////////////////////////


  // ///////////////////////////////////////////////////////////// BEGIN SUB-CATEGORY ///////////////////////////////////////
  //**************************** get all sub-category ***********************************
  getSubCategory(): Observable<ISubcategory[]> {
    return this.http.get<ISubcategory[]>(environment.API + '/api/sub-category/')
  }

  //******************************** save sub-category ***********************************
  subCategory(data: ISubcategory): Observable<ISubcategory> {
    return this.http.post<ISubcategory>(environment.API + '/api/sub-category/', data)
  }

  //******************************** edit sub-category ***********************************
  editSubCategory(id: number, data: ISubcategory): Observable<ISubcategory> {
    return this.http.put<ISubcategory>(environment.API + '/api/sub-category/' + id + '/', data)
  }

  // *********************************** change the state of category from the table ***********************
  editStateSubCategory(id: number, data: {}): Observable<Icategory> {
    return this.http.put<Icategory>(environment.API + '/api/sub-category/' + id + '/', data)
  }

  //  ******************************* delete category *******************************************
  delSubCategory(id: number): Observable<string> {
    return this.http.delete<string>(environment.API + '/api/sub-category/' + id + '/')
  }


  // ///////////////////////////////////////////////////////////// BEGIN SIZE ///////////////////////////////////////
  //**************************** get all size ***********************************
  getSize(): Observable<Isize[]> {
    return this.http.get<Isize[]>(environment.API + '/api/size/')
  }

  //******************************** save size ***********************************
  size(data: Isize): Observable<Isize> {
    return this.http.post<Isize>(environment.API + '/api/size/', data)
  }

  //******************************** edit sub-category ***********************************
  editSize(id: number, data: Isize): Observable<Isize> {
    return this.http.put<Isize>(environment.API + '/api/size/' + id + '/', data)
  }

  // *********************************** change the state of size from the table ***********************
  editStateSize(id: number, data: {}): Observable<Icategory> {
    return this.http.put<Icategory>(environment.API + '/api/size/' + id + '/', data)
  }

  //  ******************************* delete size *******************************************
  delSize(id: number): Observable<string> {
    return this.http.delete<string>(environment.API + '/api/size/' + id + '/')
  }
  // ///////////////////////////////////////////////////////////// END SIZE ///////////////////////////////////////


  // ///////////////////////////////////////////////////////////// BEGIN COLOR ///////////////////////////////////////
  //******************************** save color ***********************************
  getColors(): Observable<any> {
    return this.http.get<any>('/assets/color.json')
  }

  // ///////////////////////////////////////////////////////////// END COLOR ///////////////////////////////////////


  // ///////////////////////////////////////////////////////////// BEGIN BRAND ///////////////////////////////////////
  saveBrand(data: Ibrand): Observable<Ibrand> {
    return this.http.post<Ibrand>(environment.API + '/api/brand/', data)
  };

  //**************************** get all category ***********************************
  getBrand(): Observable<Ibrand[]> {
    return this.http.get<Ibrand[]>(environment.API + '/api/brand/')
  }

  //******************************** edit brand ***********************************
  editBrand(id: number, data: any): Observable<any> {
    return this.http.put<any>(environment.API + '/api/brand/' + id + '/', data)
  }

  //  ******************************* delete brand *******************************************
  delBrand(id: number): Observable<string> {
    return this.http.delete<string>(environment.API + '/api/brand/' + id + '/')
  }

  // ///////////////////////////////////////////// ABOUT PRODUCT /////////////////////////////////////////////
  // ********************************************** retrieve products *******************************************
  getProducts(): Observable<Iproduct[]> {
    return this.http.get<Iproduct[]>(environment.API + '/api/register-product/', { withCredentials: true })
  }

  // ********************************************** register product *******************************************
  saveProduct(data: Iproduct): Observable<Iproduct> {
    return this.http.post<Iproduct>(environment.API + '/api/register-product/', data, { withCredentials: true })
  }

  //  ******************************* delete brand *******************************************
  delProduct(id: number): Observable<string> {
    return this.http.delete<string>(environment.API + '/api/edit-delete-product/' + id + '/')
  }

  // *********************************** change the state of category from the table ***********************
  editProduct(id: number, data: {}): Observable<Iproduct> {
    return this.http.put<Iproduct>(environment.API + '/api/edit-delete-product/' + id + '/', data)
  }

  // ////////////////////////////////////////////// FOR VALIDATION PRODUCT /////////////////////////////////////////////// 
  // ********************************************** retrieve products for validation *******************************************
  getProductValidation(): Observable<Iproduct[]> {
    return this.http.get<Iproduct[]>(environment.API + '/api/get-all-products/', { withCredentials: true })
  }

  //******************************** edit validation product ***********************************
  validateProd(id: number, data: any): Observable<any> {
    return this.http.put<any>(environment.API + '/api/get-all-products/' + id + '/', data)
  }

}