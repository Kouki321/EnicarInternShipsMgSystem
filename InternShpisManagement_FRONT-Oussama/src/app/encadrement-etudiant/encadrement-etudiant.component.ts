import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DemandeEncadrementService } from '../services/demande-encadrement.service';
import { DemandeEncadrementRes } from '../Responses/DemandeEncadrement';

@Component({
  selector: 'app-encadrement-etudiant',
  templateUrl: './encadrement-etudiant.component.html',
  styleUrls: ['./encadrement-etudiant.component.css']
})
export class EncadrementEtudiantComponent implements OnInit{

  demandes: DemandeEncadrementRes[] = [];
  demandesFiltred: DemandeEncadrementRes[] = [];

  constructor(public authService:AuthService, public demandeService:DemandeEncadrementService){}
  ngOnInit(): void {
    this.authService.get(this.authService.loggedUser).subscribe((res:any)=>{
      this.demandeService.getByEtudiant(res.body.userId).subscribe((res)=>{
        this.demandes = res;
        this.demandesFiltred = res;
      })
    })

  }


  doFilter(event: any){
    const searchTerm = event.target.value.toLowerCase();

    if (searchTerm === '') {
      this.demandesFiltred = [...this.demandes];
      return;
    }

    this.demandesFiltred = this.demandes.filter(demande =>
      demande.sujet.toLowerCase().includes(searchTerm) ||
      demande.encadreur.toLowerCase().includes(searchTerm) ||
      demande.etat.toLowerCase().includes(searchTerm) 
    );
  }
}
