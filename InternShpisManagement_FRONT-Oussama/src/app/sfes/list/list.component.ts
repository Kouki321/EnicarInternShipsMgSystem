import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { error } from 'jquery';
import { Observable, catchError, map, of } from 'rxjs';
import { UserResponse } from 'src/app/Responses/UserResponse';
import { Salle } from 'src/app/requests/Salle';
import { SalleService } from 'src/app/services/salle.service';
import { SfesService } from 'src/app/services/sfes.service';
import { SoutenanceService } from 'src/app/services/soutenance.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

  constructor(private sfesService:SfesService,private formBuilder: FormBuilder,private  salleService:SalleService,
    private userService:UserService,private soutenanceService:SoutenanceService){}

  sfes:any[] = [];
  data: FormGroup = new FormGroup({});
  idSfe = 0;
  rapporteurs:UserResponse[] = [];
  presidents:UserResponse[] = [];
  salles:Salle[] = [];

  
  ngOnInit(): void {
    this.sfesService.getAll().subscribe((res:any) =>{
      this.sfes = res;
    })	

    this.createForm();
  }

  createForm() {
    this.data = this.formBuilder.group({
      sfe: new FormControl(''),
      encadreur: new FormControl(''),
      president: new FormControl('',[Validators.required]),
      rapporteur: new FormControl('',[Validators.required]),
      salle: new FormControl('',[Validators.required]),
      date: new FormControl('',Validators.required)
    });

   
  }

  closeModal() {
    const modal = document.getElementById('exampleModal');
    if (modal) {
      modal.classList.remove('show');
      modal.setAttribute('aria-modal', 'false');
      modal.setAttribute('aria-hidden', 'true');
    }
  }



  update(id:number){
    this.idSfe = id;
    this.data.get('sfe')?.disable();
    this.data.get('encadreur')?.disable();
    this.sfesService.getSFEById(id).subscribe((res:any) =>{
      this.data.patchValue({
        sfe: res.sujet,
        encadreur: res.encadreur.nom + ' ' + res.encadreur.prenom,
      });

      this.userService.getEnseignantsByDepartment(res.etudiant.userId).subscribe((result:UserResponse[])=>{
        this.rapporteurs = this.presidents = result;
      })
    })

    this.salleService.getAll().subscribe((s:Salle[])=>{
      this.salles = s;
    })

  }

  onUpdate() {
    this.data.get('sfe')?.enable();
    this.data.patchValue({sfe: this.idSfe});
    console.log(this.data.value);
    this.soutenanceService.add(this.data.value).subscribe((res: any) => {
      if (res) {
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Soutenance  planifiée ...',
          text: 'La soutenance est planifiée avec succès !',
        })
  
        this.closeModal();
        this.ngOnInit();
        this.data.reset();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Quelque chose s'est mal passé!",
        })
      }
    }, (err: any) => {
      // Displaying the error message received from the backend
      if (err.error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error,
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Quelque chose s'est mal passé!",
        })
      }
    });
  }
}