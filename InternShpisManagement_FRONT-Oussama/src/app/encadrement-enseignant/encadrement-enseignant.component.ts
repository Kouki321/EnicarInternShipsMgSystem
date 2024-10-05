import { Component, OnInit } from '@angular/core';
import { DemandeEncadrementRes } from '../Responses/DemandeEncadrement';
import { AuthService } from '../services/auth.service';
import { DemandeEncadrementService } from '../services/demande-encadrement.service';
import { Etat } from '../requests/Etat';
import Swal from 'sweetalert2';
import { TrelloService } from '../services/trello.service';
import { SfesService } from '../services/sfes.service';

@Component({
  selector: 'app-encadrement-enseignant',
  templateUrl: './encadrement-enseignant.component.html',
  styleUrls: ['./encadrement-enseignant.component.css']
})
export class EncadrementEnseignantComponent implements OnInit{

  demandes: DemandeEncadrementRes[] = [];
  demandesFiltred: DemandeEncadrementRes[] = [];

  constructor(public authService:AuthService, public demandeService:DemandeEncadrementService,
    public trelloService:TrelloService, private sfeService:SfesService
  ){}
  ngOnInit(): void {
    this.authService.get(this.authService.loggedUser).subscribe((user:any)=>{
      console.log(user);
      this.demandeService.getByEnseignant(user.body.userId).subscribe((res)=>{
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
      demande.etudiant.toLowerCase().includes(searchTerm) ||
      demande.etat.toLowerCase().includes(searchTerm) 
    );
  }

  accepter(idEtud:number, idEns: number){
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Une fois la candidature est acceptée vous ne pouvez pas la changer ! ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, acceptez-le!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.demandeService.update(idEtud,idEns,'ACCEPTATION').subscribe((demande:any)=>{
          if (demande){
            this.trelloService.addBoard(demande.sujet).subscribe((board:any)=>{
              if (board){
                console.log(board.id);
                console.log(demande.etudiant.userId)
                this.sfeService.addTrello({idBoard:board.id, userId: demande.etudiant.userId, url:board.shortUrl}).subscribe((res:any)=>{
                  Swal.fire({
                    icon: 'success',
                    title: 'Success...',
                    text: 'Candidature acceptée !',
                  })
                  this.ngOnInit();
                })
              }
            })
          }
          else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: "Quelque chose s'est mal passé!",
            })
          }
        },
        err =>{
          Swal.fire({
            icon: 'warning',
            title: 'La suppression a échoué!...',
            text: err.error.message,
          })
        }
        )
      }
    }
    )
  }

  refuser(idEtud:number, idEns: number){
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Voulez-vous vraiment réfuser cette candidature ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, refusez-le!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.demandeService.update(idEtud,idEns,'REFUS').subscribe((res:any)=>{
          if (res){
            Swal.fire({
              icon: 'success',
              title: 'Success...',
              text: 'Refusé avec succès !',
            })
            this.ngOnInit();
          }
          else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: "Quelque chose s'est mal passé!",
            })
          }
        },
        err =>{
          Swal.fire({
            icon: 'warning',
            title: 'La suppression a échoué!...',
            text: err.error.message,
          })
        }
        )
      }
    }
    )
  }
}
