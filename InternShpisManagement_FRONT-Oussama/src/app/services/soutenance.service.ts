import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Soutenance } from '../requests/Soutenance';
import { SoutenanceResponse } from '../Responses/SoutenanceResponse';

@Injectable({
  providedIn: 'root'
})
export class SoutenanceService {

  constructor(private http: HttpClient, private router:Router, private authService:AuthService) { }

  
  getAll():Observable<any>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.get<any>(environment.apiURL+'/soutenance',{headers:httpHeaders});  
  }

  add(s: Soutenance):Observable<any>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.post(environment.apiURL+'/soutenance/add',s,{headers:httpHeaders});  
  }

  getByEtud(id: number):Observable<SoutenanceResponse[]>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.get<SoutenanceResponse[]>(environment.apiURL+'/soutenance/etud/'+id,{headers:httpHeaders});  
  }

  getByEns(id: number):Observable<SoutenanceResponse[]>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.get<SoutenanceResponse[]>(environment.apiURL+'/soutenance/en/'+id,{headers:httpHeaders});  
  }

  getBySfe(id: number):Observable<SoutenanceResponse[]>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.get<SoutenanceResponse[]>(environment.apiURL+'/soutenance/en/'+id,{headers:httpHeaders});  
  }
}


