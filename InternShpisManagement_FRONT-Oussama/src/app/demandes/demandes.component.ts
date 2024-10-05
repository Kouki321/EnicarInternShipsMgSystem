import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserResponse } from '../Responses/UserResponse';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-demandes',
  templateUrl: './demandes.component.html',
  styleUrls: ['./demandes.component.css']
})
export class DemandesComponent implements OnInit{

  constructor(private userService:UserService){}

  demandes:UserResponse[] = [];
  ngOnInit(): void {
    this.userService.getDemandes().subscribe((res: UserResponse[]) =>{
      this.demandes = res;
    })
  }

  accepter(id: number){
    console.log(id);
    this.userService.activer(id).subscribe( (res:any) =>{
      console.log(res);
        if (res != null){
          Swal.fire({
            icon: 'success',
            title: 'Demande acceptée ...',
            text: res.body.token,
          })
          this.ngOnInit();
        }
    })
  }
}
