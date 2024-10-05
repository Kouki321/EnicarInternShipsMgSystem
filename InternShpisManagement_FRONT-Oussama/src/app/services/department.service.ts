import { Department } from './../requests/Department';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient, private router:Router, private authService:AuthService) { }

  
  getAll():Observable<any>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.get<any>(environment.apiURL+'/departments',{headers:httpHeaders});  
  }

  add(d: Department):Observable<any>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.post('/api/departments',d,{headers:httpHeaders});  
  }

  update(d: Department, id:number):Observable<Department>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.post<Department>(environment.apiURL+'/departments/update/'+id,d,{headers:httpHeaders});  
  }

  delete(id: number):Observable<any>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.delete(environment.apiURL+'/departments/'+id,{headers:httpHeaders});  
  }

  get(id: number):Observable<Department>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.get<Department>(environment.apiURL+'/departments/'+id,{headers:httpHeaders});  
  }
}
