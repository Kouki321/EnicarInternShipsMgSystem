import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Sfe } from './../requests/Sfe';
import { SfeResponse } from '../Responses/SfeResponse';

@Injectable({
  providedIn: 'root'
})
export class SfesService {

    constructor(private http: HttpClient, private router:Router, private authService:AuthService) { }
    getAll():Observable<SfeResponse[]>{
      let jwt = this.authService.getToken();
      jwt = "Bearer " + jwt;
      let httpHeaders = new HttpHeaders({"Authorization": jwt})

      return this.http.get<SfeResponse[]>(environment.apiURL+'/sfe',{headers:httpHeaders});  
    }
  
    add(d: Sfe):Observable<any>{
      let jwt = this.authService.getToken();
      jwt = "Bearer " + jwt;
      let httpHeaders = new HttpHeaders({"Authorization": jwt})

      return this.http.post(environment.apiURL+'/sfe',d,{headers:httpHeaders});  
    }
    delete(id: number):Observable<any>{
      let jwt = this.authService.getToken();
      jwt = "Bearer " + jwt;
      let httpHeaders = new HttpHeaders({"Authorization": jwt})

      return this.http.delete<any>(environment.apiURL+'/sfe/'+id,{headers:httpHeaders});  
    }
    
    getSFEById(id: number):Observable<Sfe>{
      let jwt = this.authService.getToken();
      jwt = "Bearer " + jwt;
      let httpHeaders = new HttpHeaders({"Authorization": jwt})
      return this.http.get<Sfe>(environment.apiURL+'/sfe/'+id,{headers:httpHeaders});  
    }

    getSFEByEtudId(id: number):Observable<any>{
      let jwt = this.authService.getToken();
      jwt = "Bearer " + jwt;
      let httpHeaders = new HttpHeaders({"Authorization": jwt})

      return this.http.get<Sfe>(environment.apiURL+'/sfe/etudiant/'+id,{headers:httpHeaders});  
    }

    getSFEByEnsId(id: number):Observable<any>{
      let jwt = this.authService.getToken();
      jwt = "Bearer " + jwt;
      let httpHeaders = new HttpHeaders({"Authorization": jwt})
      return this.http.get<any>(environment.apiURL+'/sfe/en/'+id,{headers:httpHeaders});  
    }

    getSFEByEtudUsername(username: string| null):Observable<any>{
      let jwt = this.authService.getToken();
      jwt = "Bearer " + jwt;
      let httpHeaders = new HttpHeaders({"Authorization": jwt})
      return this.http.get<any>(environment.apiURL+'/sfe/etudiant/username/'+username,{headers:httpHeaders});  
    }

    updateSFE(d: Sfe):Observable<Sfe>{
      let jwt = this.authService.getToken();
      jwt = "Bearer " + jwt;
      let httpHeaders = new HttpHeaders({"Authorization": jwt})

      return this.http.post<Sfe>(environment.apiURL+'/sfe/'+d,{headers:httpHeaders});  
    }

    addTrello(data:any):any{
      let jwt = this.authService.getToken();
      jwt = "Bearer " + jwt;
      let httpHeaders = new HttpHeaders({"Authorization": jwt})
      return this.http.post(environment.apiURL+'/sfe/trello/add',data,{headers:httpHeaders});
      } 

      getTrelloBorad(idSfe:any):Observable<any>{
        let jwt = this.authService.getToken();
        jwt = "Bearer " + jwt;
        let httpHeaders = new HttpHeaders({"Authorization": jwt})
        return this.http.get(environment.apiURL+'/sfe/trello/board/'+idSfe,{headers:httpHeaders});
        } 
   
  
  }