import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { DemandeEncadrement } from '../requests/DemandeEncadrement';
import { Etat } from '../requests/Etat';

@Injectable({
  providedIn: 'root'
})
export class DemandeEncadrementService {

  constructor(private http: HttpClient, private router:Router, private authService:AuthService) { }

  
  getAll():Observable<any>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.get<any>(environment.apiURL+'/departments',{headers:httpHeaders});  
  }

  add(d: DemandeEncadrement):Observable<any>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.post(environment.apiURL+'/DemandeEncadrement/add',d,{headers:httpHeaders});  
  }

  update(idEtud:number, idEns: number, etat: string):Observable<any>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.put(environment.apiURL+'/DemandeEncadrement/update/'+idEns+'/'+idEtud+'/'+etat,null,{headers:httpHeaders});  
  }
  
  getByEtudiant(id:number):Observable<any>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.get(environment.apiURL+'/DemandeEncadrement/etud/'+id,{headers:httpHeaders});  

  }

  getByEnseignant(id:number):Observable<any>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.get(environment.apiURL+'/DemandeEncadrement/en/'+id,{headers:httpHeaders});  

  }

}
