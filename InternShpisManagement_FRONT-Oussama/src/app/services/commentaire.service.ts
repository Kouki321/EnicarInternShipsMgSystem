import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Commentaire } from '../requests/Commentaire';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {

  constructor(private http: HttpClient, private router:Router, private authService:AuthService) { }

  add(c: Commentaire, id:number):Observable<any>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.post(environment.apiURL+'/commentaire/add/'+id,c,{headers:httpHeaders});  
  }

  getAllBySfe(id:number):Observable<any>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.get(environment.apiURL+'/sfe/'+id,{headers:httpHeaders});  
  }
}
