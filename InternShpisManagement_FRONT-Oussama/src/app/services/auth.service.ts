import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import { RequestLogin } from '../requests/RequestLogin';
import { UserRequest } from '../requests/UserRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string | null = null;
  public loggedUser: string | null=  null;
  public isloggedIn: Boolean = false;
  public roles:string[] | null = null;
  private helper = new JwtHelperService();

  constructor(private http: HttpClient, private router:Router) {}

  login(user: RequestLogin){
    return this.http.post<string>(environment.apiURL+'/auth/authentication',user,{observe:'response'});
  }

  signup(user:UserRequest){
    return this.http.post(environment.apiURL+'/auth/register',user,{observe:'response'});
  }

  get(username: any){
    return this.http.get(environment.apiURL+'/auth/user/username/'+username,{observe:'response'});
  }

  saveToken(jwt:string){
    localStorage.setItem('jwt',jwt);
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJWT();

  }

  getToken():string | null {
    return this.token;
  }

  decodeJWT()
  {
    if (this.token == undefined)
      return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.role;
    this.loggedUser = decodedToken.sub;
    localStorage.setItem('user',decodedToken.sub);
  }

  loadToken() {
    this.token = localStorage.getItem('jwt');
    this.decodeJWT();
    }

    isTokenExpired(): Boolean
    {
    return this.helper.isTokenExpired(this.token); 
    }

    logout() {
      this.loggedUser = null;
      this.roles = null;
      this.token= null;
      this.isloggedIn = false;
      localStorage.removeItem('jwt');
      this.router.navigate(['/login']);
      localStorage.removeItem('user');
      }
    
      
      isAdmin():Boolean{
        if (!this.roles) //this.roles== undefiened
            return false;
        return (this.roles.indexOf('DIRECTION') >=0);
      }
    
      isStudent():Boolean{
        if (!this.roles) //this.roles== undefiened
            return false;
        return (this.roles.indexOf('ETUDIANT') >=0);
      }
    
      isTeacher():Boolean{
        if (!this.roles) //this.roles== undefiened
            return false;
        return (this.roles.indexOf('ENSEIGNANT') >=0);
      }    
      setLoggedUserFromLocalStorage(login : string) {
        this.loggedUser = login;
        this.isloggedIn = true;
      }  
}
