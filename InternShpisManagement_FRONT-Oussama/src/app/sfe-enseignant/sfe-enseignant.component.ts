import { Component, OnInit } from '@angular/core';
import { SfeResponse } from '../Responses/SfeResponse';
import { AuthService } from '../services/auth.service';
import { CommentaireService } from '../services/commentaire.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SfesService } from '../services/sfes.service';
import { Commentaire } from '../requests/Commentaire';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sfe-enseignant',
  templateUrl: './sfe-enseignant.component.html',
  styleUrls: ['./sfe-enseignant.component.css']
})
export class SfeEnseignantComponent implements OnInit{


  sfes: SfeResponse[] = [];
  filredSfes: SfeResponse[] = [];
  commentaires:Commentaire[] = [] ;
  idSfe: number = 0;

  nom:string ='';
  prenom:string ='';
  commentaireForm: FormGroup = new FormGroup({});

  constructor(public authService:AuthService, 
    private commentaireService:CommentaireService,
    private formBuilder: FormBuilder,
    public sfeService:SfesService){}

  ngOnInit(): void {
    this.authService.get(this.authService.loggedUser).subscribe((res:any)=>{
        this.sfeService.getSFEByEnsId(res.body.userId).subscribe((result:any)=>{
          console.log(result)
          this.sfes = result;
          this.filredSfes = result;
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

  afficher(id:number){
    this.commentaireService.getAllBySfe(id).subscribe((comm:any)=>{
        this.commentaires = comm.commentaires;
        this.commentaires.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    })
  }

  verif(username: string):Boolean{
    let user:string = this.nom + ' ' + this.prenom;
    console.log(user);
    console.log(username);
    if (username === user) 
      return true
    return false;
}


  setId(id:any){
    this.idSfe = id;
  }
  onSubmit(){
    this.authService.get(this.authService.loggedUser).subscribe((res:any)=>{
      this.commentaireForm.patchValue({owner: res.body.nom+ ' '+ res.body.prenom});
      console.log(this.commentaireForm.value);
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

  closeModal() {
    const modal = document.getElementById('exampleModal');
    if (modal) {
      modal.classList.remove('show');
      modal.setAttribute('aria-modal', 'false');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  doFilter(event: any){
    const searchTerm = event.target.value.toLowerCase();

    if (!searchTerm) {
      this.filredSfes = [...this.sfes];
      return;
    }

    this.filredSfes = this.sfes.filter(sfe =>
      sfe.etudiant.toLowerCase().includes(searchTerm) ||
      sfe.sujet.toLowerCase().includes(searchTerm)
    );
  }

  goToTrello(id:number) {
    console.log(id);
    this.sfeService.getTrelloBorad(id).subscribe(res=>{
      window.open(res.url, '_blank');
    })
   
  }
}
