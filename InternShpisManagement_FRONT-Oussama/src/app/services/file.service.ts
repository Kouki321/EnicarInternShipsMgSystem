import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';
import { ResponseFile } from '../Responses/ResponseFile';



const headers = new HttpHeaders().set(
  "Content-Type",
  "application/json; charset=utf-8"
);

  
@Injectable({
  providedIn: 'root'
})
export class FileService {


  constructor(private http: HttpClient,private authService:AuthService) { }
  upload(file: File|null, id: number): Observable<HttpEvent<any>> {
    if (file != null){

      let jwt = this.authService.getToken();
      jwt = "Bearer " + jwt;
      let httpHeaders = new HttpHeaders({"Authorization": jwt})
      const formData: FormData = new FormData();

      formData.append('file', file);
  
      const req = new HttpRequest('POST', `${environment.apiURL}/file/upload/${id}`, formData, {
        headers: httpHeaders, // Use 'headers' instead of 'httpHeaders'
        reportProgress: true,
        responseType: 'json'
      });
  
      return this.http.request(req);
    }
    return new Observable;

  }

  getFile(id: number): Observable<any> {
    return this.http.get(`${environment.apiURL}/file/${id}`);
  }

  getFilee(url: String): any {
    return this.http.get(`${environment.apiURL}/file/${url}`);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${environment.apiURL}/file/files`);
  }

  /*getBySfe(id:number):ResponseFile[]{
    return this.http.get<ResponseFile[](`${environment.apiURL}/file/sfe/${id}`);
  }*/

  getByFilesOrdered():Observable<ResponseFile[]>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.get<ResponseFile[]>(environment.apiURL+'/file',{headers:httpHeaders});  
  }

  getBySfe(id: number):Observable<ResponseFile[]>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt})
    return this.http.get<ResponseFile[]>(environment.apiURL+'/file/sfe/'+id,{headers:httpHeaders});  
  }



  /*downloadFile(id:any) {
    // we would call the spring-boot service
    const REQUEST_URI = environment.apiURL + "/download/"+id;
    return this.http.get(REQUEST_URI, {
      params: null,
      responseType: 'arraybuffer'
    })
  }*/

  downloadFile(id: any) {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt});
    return this.http.get(environment.apiURL+'/file/download/'+id, {
      headers: httpHeaders,
      responseType: 'arraybuffer'
    });
  }
}
