import { UserResponse } from './../../Responses/UserResponse';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  constructor(private userService: UserService, private authService: AuthService){}

  etudiants: UserResponse[] = [];
  filteredEtudiants: UserResponse[] = [];
  username: string | null = "";

  ngOnInit(): void {
    this.username = localStorage.getItem('user');
    console.log(this.username);
    this.userService.getEtudiants().subscribe((res: UserResponse[]) =>{
      this.etudiants = res;
      this.filteredEtudiants = [...this.etudiants];
    })
  }

  activer(id: number, enabled: boolean){
    const action = enabled ? 'Désactivé' : 'Activé';
    const apiCall = enabled ? this.userService.Desactiver(id) : this.userService.activer(id);

    apiCall.subscribe((res: any) => {
      if (res != null){
        Swal.fire({
          icon: 'success',
          title: `Compte ${action} ...`,
          text: res.body.token,
        })
        this.ngOnInit();
      }
    });
  }

  onLogout(){
    this.authService.logout();
  }

  doFilter(event: any){
    const searchTerm = event.target.value.toLowerCase();

    if (!searchTerm) {
      this.filteredEtudiants = [...this.etudiants];
      return;
    }

    this.filteredEtudiants = this.etudiants.filter(etudiant =>
      etudiant.nom.toLowerCase().includes(searchTerm) ||
      etudiant.prenom.toLowerCase().includes(searchTerm) ||
      etudiant.department.toLowerCase().includes(searchTerm)
    );
  }
}
