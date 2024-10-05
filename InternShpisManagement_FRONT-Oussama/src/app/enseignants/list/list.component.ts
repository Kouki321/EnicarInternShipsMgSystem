import { SfesService } from './../../services/sfes.service';
import { Sfe } from './../../requests/Sfe';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserResponse } from 'src/app/Responses/UserResponse';
import { AuthService } from 'src/app/services/auth.service';
import { DemandeEncadrementService } from 'src/app/services/demande-encadrement.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  demandeEncadrement: FormGroup = new FormGroup({});

  constructor(private userService:UserService,
    public  authService:AuthService,
    public demandeEncadrementService: DemandeEncadrementService,
    public sfesService: SfesService,
    private formBuilder: FormBuilder){}
    err:number = 0;

  enseignants: UserResponse[] = [];
  filteredEnseignants: UserResponse[] = [];

  ngOnInit(): void {
    this.userService.getEnseignants().subscribe((res: UserResponse[]) =>{
      this.enseignants = res;
      this.filteredEnseignants = [...this.enseignants];

    })
    this.createForm();

    this.sfesService.getSFEByEtudUsername(this.authService.loggedUser).subscribe((res:any)=>{
      if (res != null)
        this.err = 1
    })
  }

  createForm() {
    this.demandeEncadrement = this.formBuilder.group({
      etudiantId: [''],
      encadreurId: [''],
      sujet:['', Validators.required],
      etudiant:[''],
      encadreur: ['']
    });

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

  doFilter(event: any){
    const searchTerm = event.target.value.toLowerCase();

    if (!searchTerm) {
      this.filteredEnseignants = [...this.enseignants];
      return;
    }

    this.filteredEnseignants = this.enseignants.filter(enseignant =>
      enseignant.nom.toLowerCase().includes(searchTerm) ||
      enseignant.prenom.toLowerCase().includes(searchTerm) ||
      enseignant.department.toLowerCase().includes(searchTerm)
    );
  }

  demander(nom:any,prenom:any,id:any){
    this.authService.get(this.authService.loggedUser).subscribe((res:any) =>{
      this.demandeEncadrement.patchValue({
        encadreur: nom + ' ' + prenom,
        encadreurId: id,
        etudiantId: res.body.userId
      });
    })


  }

  onSubmit(){
    
    console.log(this.demandeEncadrement.value);
  
    this.demandeEncadrementService.add(this.demandeEncadrement.value).subscribe(res =>{
      if (res != null){
        Swal.fire({
          icon: 'success',
          title: 'Department ajoutéé ...',
          text: 'La départment est ajoutée avec succés !',
        })
        this.closeModal();
      }
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
}
