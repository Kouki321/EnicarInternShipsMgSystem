import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  type = ["ETUDIANT","ENSEIGNANT"];
  departments = ["Informatique", "Mecatronique", "Infortronique"];

  err:number = 0;
  i: number = 0;
  j: number = 0;
  registerForm: FormGroup = new FormGroup({});
  constructor(public authService : AuthService,
    private userService: UserService,private router:Router,private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.registerForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', Validators.required],
      department: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],

    });
  }

  onSubmit(){
    console.log(this.registerForm.value);
    this.authService.signup(this.registerForm.value).subscribe((res:any)=>{
      if (res != null){
        this.router.navigate(['/login']);
      }
    },(err: any) =>{
      this.err = 1;
      });
  }

  filter(e: any){
    this.i = 1;
  }
  filter2(e: any){
    this.j = 1;
  }
}
