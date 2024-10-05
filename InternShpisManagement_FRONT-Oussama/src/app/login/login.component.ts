import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  err:number = 0;
  loginForm: FormGroup = new FormGroup({});

  i:number = 0;
  constructor(public authService : AuthService,private router:Router,private formBuilder: FormBuilder,
    private messageService:MessageService
            ){}

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  
  
  onSubmit() {  
    this.authService.login(this.loginForm.value).subscribe((data: any)=>{
      let jwToken = data.body.token;
      this.authService.saveToken(jwToken);
      this.messageService.send('isAuthenticated');
      if (this.authService.isAdmin())
        this.router.navigate(['/demandes']);
      else if (this.authService.isStudent())
        this.router.navigate(['/encadrement/etudiant']);
      else if (this.authService.isTeacher())
        this.router.navigate(['/encadrement/enseignant']);      
    },(err) =>{
    this.err = 1;
    });

  }

  change(e:any){
    this.err = 0;
    this.i = 1
  }

}

