import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { SoutenanceService } from '../services/soutenance.service';
import { SoutenanceResponse } from '../Responses/SoutenanceResponse';
import * as saveAs from 'file-saver';
import { FileService } from '../services/file.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteService } from '../services/note.service';
import Swal from 'sweetalert2';

const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetxml.sheet',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
}

@Component({
  selector: 'app-soutenances-ens',
  templateUrl: './soutenances-ens.component.html',
  styleUrls: ['./soutenances-ens.component.css']
})
export class SoutenancesEnsComponent implements OnInit {

  constructor(private soutenanceService:SoutenanceService,private formBuilder: FormBuilder,private authService:AuthService,
    private uploadService:FileService,private noteService:NoteService
  ){}

  noteForm: FormGroup = new FormGroup({});
  soutenances:SoutenanceResponse[] = [];
  note = 0;
  idSoutenance = 0;
  user:string = '';
  ngOnInit(): void {
    this.authService.get(this.authService.loggedUser).subscribe((res:any)=>{
      this.user = res.body.nom + ' ' + res.body.prenom;
      this.soutenanceService.getByEns(res.body.userId).subscribe((res:any) =>{
        this.soutenances = res;
        console.log(res);
      })	
    })
    this.createForm();
  }

  createForm() {
    this.noteForm = this.formBuilder.group({
      note: ['', Validators.required],
      soutenance:['']
    });
  }
  downloadFile(id:any) {
    this.uploadService.downloadFile(id)
      .subscribe(data => {
        //save it on the client machine.
        saveAs(new Blob([data], {type: MIME_TYPES['pdf'] as string}));
        
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

  setId(id:any){
    this.idSoutenance = id;
  }
  onSubmit(){
    this.noteForm.patchValue({soutenance: this.idSoutenance});
    console.log(this.noteForm.value);
    this.noteService.add(this.noteForm.value).subscribe(res =>{
      if (res != null){
        Swal.fire({
          icon: 'success',
          title: 'Note déposé ...',
          text: 'La note est déposée avec succés !',
        })

        this.closeModal();
        this.ngOnInit();
        this.noteForm.reset();
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
    })
  }

}  
