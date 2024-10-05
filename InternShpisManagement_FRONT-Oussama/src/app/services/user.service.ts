import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { UserRequest } from '../requests/UserRequest';
import { UserResponse } from '../Responses/UserResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router:Router, private authService:AuthService) { }

  getUser(id:number):Observable<any>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.get<any>('/api/auth/user/'+id,{headers:httpHeaders});  
  }

  update(user:UserRequest,id:number):Observable<any>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.post<any>('/api/auth/update/'+id,user,{headers:httpHeaders});  
  }

  getEtudiants():Observable<UserResponse[]>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.get<any>('/api/users/etudiants',{headers:httpHeaders});  

  }

  getEnseignants():Observable<UserResponse[]>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.get<any>('/api/users/enseignants',{headers:httpHeaders});  

  }

  getEnseignantsByDepartment(id:any):Observable<UserResponse[]>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.get<any>('/api/users/enseignants/departments/'+id,{headers:httpHeaders});  

  }

  getDemandes():Observable<UserResponse[]>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.get<any>('/api/users/demandes',{headers:httpHeaders});  

  }

  addUser(user:UserRequest):any{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt});
    return this.http.post('/api/auth/add',user,{observe:'response',headers:httpHeaders});
  }


  activer(id:number):any{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.post('/api/auth/account/activate/'+id,null,{observe:'response',headers:httpHeaders,});
  }

  Desactiver(id:number):any{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.post('/api/auth/account/unactivate/'+id,null,{observe:'response',headers:httpHeaders,});
  }
}
