import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Entreprise } from '../requests/Entreprise';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  constructor(private http: HttpClient, private router:Router, private authService:AuthService) { }

  
  getAll():Observable<any>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.get<any>(environment.apiURL+'/entreprises',{headers:httpHeaders});  
  }

  add(d: Entreprise):Observable<Entreprise>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.post<Entreprise>(environment.apiURL+'/entreprises/add',d,{headers:httpHeaders});  
  }

  update(d: Entreprise, id:number):Observable<Entreprise>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.post<Entreprise>(environment.apiURL+'/entreprises/update/'+id,d,{headers:httpHeaders});  
  }

  delete(id: number):Observable<any>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.delete(environment.apiURL+'/entreprises/'+id,{headers:httpHeaders});  
  }

  get(id: number):Observable<Entreprise>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.get<Entreprise>(environment.apiURL+'/entreprises/'+id,{headers:httpHeaders});  
  }
}
