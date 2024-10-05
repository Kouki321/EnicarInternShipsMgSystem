import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Salle } from '../requests/Salle';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalleService {

  constructor(private http: HttpClient, private router:Router, private authService:AuthService) { }

  
  getAll():Observable<any>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.get<Salle>(environment.apiURL+'/salle',{headers:httpHeaders});  
  }

  add(d: Salle):Observable<any>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.post(environment.apiURL+'/salle',d,{headers:httpHeaders});  
  }

  update(d: Salle, id:number):Observable<Salle>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.post<Salle>(environment.apiURL+'/salle/update/'+id,d,{headers:httpHeaders});  
  }

  delete(id: number):Observable<any>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.delete(environment.apiURL+'/salle/'+id,{headers:httpHeaders});  
  }

  getSalle(id: number):Observable<Salle>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.get<Salle>(environment.apiURL+'/salle/'+id,{headers:httpHeaders});  
  } 
  getByNom(d: Salle):Observable<Salle>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.get<Salle>(environment.apiURL+'/salle/'+d,{headers:httpHeaders});  
  }

}
