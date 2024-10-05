import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { EntrepriseService } from '../services/entreprise.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Entreprise } from '../requests/Entreprise';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-entreprises',
  templateUrl: './entreprises.component.html',
  styleUrls: ['./entreprises.component.css']
})
export class EntreprisesComponent implements OnInit{

  entrepriseForm: FormGroup = new FormGroup({});
  updateForm: FormGroup = new FormGroup({});


  constructor(private entrepriseService:EntrepriseService,private formBuilder: FormBuilder, public authService:AuthService){}
  entreprises:Entreprise[] = [];
  filteredEntreprises: Entreprise[] = [];
  specialite = ["Informatique","Infotronique", "Mecatronique","Industrielle"];
  i: number = 0;
  idEntreprise: number = 0;
  ngOnInit(): void {
    this.entrepriseService.getAll().subscribe(res =>{
      this.entreprises = res;
      this.filteredEntreprises = res;
    })	
    this.createForm();
  }


  onSubmit(){
    console.log(this.entrepriseForm.value);
    this.entrepriseService.add(this.entrepriseForm.value).subscribe(res =>{
      if (res != null){
        Swal.fire({
          icon: 'success',
          title: 'Entreprise ajoutéé ...',
          text: "L'entreprise est ajoutée avec succés !",
        })

        this.closeModal();
        this.ngOnInit();
        this.entrepriseForm.reset();
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

  closeModal2() {
    const modal = document.getElementById('exampleModal2');
    if (modal) {
      modal.classList.remove('show');
      modal.setAttribute('aria-modal', 'false');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  createForm() {
    this.entrepriseForm = this.formBuilder.group({
      nom: ['', Validators.required],
      adresse: ['', Validators.required],
      specialite: ['', Validators.required],
      telephone: ['', Validators.required, Validators.minLength(8)],
      representant: ['', Validators.required],
      email: ['', Validators.required, Validators.email]
    });

    this.updateForm = this.formBuilder.group({
      nom: [''],
      adresse: [''],
      specialite: [''],
      telephone: [''],
      representant: [''],
      email: ['']
    });
  }


  delete(id:number){
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Voulez-vous vraiment supprimer cette départment ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.entrepriseService.delete(id).subscribe((res:any) =>{
          if (res.msg){
            Swal.fire({
              icon: 'success',
              title: 'Success...',
              text: 'Supprimé avec succès !',
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

  update(id:number){
    this.entrepriseService.get(id).subscribe((res:Entreprise) =>{
      console.log(res);
      this.idEntreprise = res.id;
      this.updateForm.patchValue({
        nom:res.nom,
        adresse:res.adresse,
        email:res.email,
        telephone:res.telephone,
        specialite:res.specialite,
        representant:res.representant
      });

    })
  }

  onUpdate(){
    this.entrepriseService.update(this.updateForm.value,this.idEntreprise).subscribe(res =>{
      
      if (res != null){
        Swal.fire({
          icon: 'success',
          title: 'Modification reussite  ...',
          text: 'La départment est modifiée avec succés !',
        })

        this.closeModal2();
        this.ngOnInit();
        this.updateForm.reset();
      }
    })
  }

  doFilter(event: any){
    const searchTerm = event.target.value.toLowerCase();

    if (searchTerm === '') {
      this.filteredEntreprises = [...this.entreprises];
      return;
    }

    this.filteredEntreprises = this.entreprises.filter(entreprise =>
      entreprise.nom.toLowerCase().includes(searchTerm) ||
      entreprise.adresse.toLowerCase().includes(searchTerm) ||
      entreprise.email.toLowerCase().includes(searchTerm) ||
      entreprise.specialite.toLowerCase().includes(searchTerm) ||
      entreprise.representant.toLowerCase().includes(searchTerm) 
      );
  }

  filter(e: any){
    this.i = 1;
  }
}
