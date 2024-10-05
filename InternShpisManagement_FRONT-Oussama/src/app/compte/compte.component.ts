import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})
export class CompteComponent implements OnInit{

  err:number = 0;
  i: number = 0;
  j: number = 0;
  id: number = 0;
  registerForm: FormGroup = new FormGroup({});
  constructor(public authService : AuthService,
    private userService: UserService,private router:Router,private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.createForm();
    this.authService.get(this.authService.loggedUser).subscribe((res:any)=>{
      console.log(res.body);
      this.id = res.body.userId
      this.registerForm.patchValue({
        nom: res.body.nom,
        prenom: res.body.prenom,
        telephone: res.body.telephone,
        username: res.body.username,
        password: res.body.password,
        email: res.body.email
      })
    })
  }
  createForm() {
    this.registerForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', Validators.required],
      department: [''],
      username: ['',Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      role: [''],

    });
  }

  onSubmit(){
    console.log(this.registerForm.value);
    this.userService.update(this.registerForm.value,this.id).subscribe((res:any)=>{
      console.log(res);
      if (res != null){
        Swal.fire({
          icon: 'success',
          title: 'Mis à jour reussite !',
          text: 'Mis à jour reussite !',
        })
        this.registerForm.reset();

      }

    })
    /*this.authService.signup(this.registerForm.value).subscribe((res:any)=>{
      if (res != null){
          console.log('result !');
      }
    },(err: any) =>{
      this.err = 1;
      });*/
  }

  filter(e: any){
    this.i = 1;
  }
  filter2(e: any){
    this.j = 1;
  }
}
