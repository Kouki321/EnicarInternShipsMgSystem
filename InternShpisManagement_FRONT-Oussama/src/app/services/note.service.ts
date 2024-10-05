import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient, private router:Router, private authService:AuthService) { }

  


  add(note: any):Observable<any>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.post(environment.apiURL+'/note/add',note,{headers:httpHeaders});  
  }

  getByEtud(id: number):Observable<any>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.get<any>(environment.apiURL+'/note/etud/'+id,{headers:httpHeaders});  
  } 

  getBySoutenance(id: number):Observable<any>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.get<any>(environment.apiURL+'/note/soutenance/'+id,{headers:httpHeaders});  
  } 


}
