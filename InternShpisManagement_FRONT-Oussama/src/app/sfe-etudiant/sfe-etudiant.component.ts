import { SfesService } from 'src/app/services/sfes.service';
import { Component, OnInit } from '@angular/core';
import { DemandeEncadrementRes } from '../Responses/DemandeEncadrement';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentaireService } from '../services/commentaire.service';
import { Commentaire } from '../requests/Commentaire';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-sfe-etudiant',
  templateUrl: './sfe-etudiant.component.html',
  styleUrls: ['./sfe-etudiant.component.css']
})
export class SfeEtudiantComponent implements OnInit{

  commentaireForm: FormGroup = new FormGroup({});
  idSfe: number = 0;
  demande: DemandeEncadrementRes = new DemandeEncadrementRes();
  commentaires:Commentaire[] = [] ;

  nom:string ='';
  prenom:string ='';


  constructor(public authService:AuthService, 
    private commentaireService:CommentaireService,
    private formBuilder: FormBuilder,
    public sfeService:SfesService){}
  ngOnInit(): void {
    this.sfeService.getSFEByEtudUsername(this.authService.loggedUser).subscribe((res:any)=>{
      this.idSfe = res.id
      this.demande.encadreur = res.encadreur;
      this.demande.sujet = res.sujet;
      this.commentaireService.getAllBySfe(this.idSfe).subscribe((comm:any)=>{
        this.commentaires = comm.commentaires;
        this.commentaires.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      })
    })



    this.authService.get(this.authService.loggedUser).subscribe((res:any)=>{
      this.nom = res.body.nom;
      this.prenom = res.body.prenom;
      
    })
    this.createForm();
  }

  createForm() {
    this.commentaireForm = this.formBuilder.group({
      commentaire: ['',Validators.required],
      owner: ['']
    });

  }

  onSubmit(){
    this.authService.get(this.authService.loggedUser).subscribe((res:any)=>{
      this.commentaireForm.patchValue({owner: res.body.nom+ ' '+ res.body.prenom});
      this.commentaireService.add(this.commentaireForm.value,this.idSfe).subscribe(res =>{
        if (res != null){
          Swal.fire({
            icon: 'success',
            title: 'Department ajoutéé ...',
            text: 'La départment est ajoutée avec succés !',
          })
          this.closeModal();
          this.ngOnInit();
        }
      })
    })

  }

  verif(username: string):Boolean{
      let user:string = this.nom + ' ' + this.prenom;
      if (username === user) 
        return true
      return false;
  }

  closeModal() {
    const modal = document.getElementById('exampleModal');
    if (modal) {
      modal.classList.remove('show');
      modal.setAttribute('aria-modal', 'false');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  
  goToTrello(id:number) {
    this.sfeService.getTrelloBorad(id).subscribe(res=>{
      window.open(res.url, '_blank');
    })
   
  }



}
