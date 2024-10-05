import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'tourisme_medicale';
  verif = true;
  username:string|null = "";
  constructor (public authService: AuthService,private router: Router,
    private messageService:MessageService) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('user');
    this.authService.loadToken();
    this.messageService.getMessage().subscribe(res=>{
      if (res.message === 'isAuthenticated'){
        this.verif = true;
        this.ngOnInit();

      }
      else if (res.message = 'logout')
        this.verif = false;
    })
    if (this.authService.getToken()==null || this.authService.isTokenExpired()){
      this.authService.logout();
      this.verif = false;
      //this.router.navigate(['/login']);

    }
  }

  
  onLogout(){
    this.authService.logout();
    this.ngOnInit();
  }
}
