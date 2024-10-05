import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalleService } from 'src/app/services/salle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  constructor(private sallesService:SalleService,
    private formBuilder: FormBuilder){}

  salleForm: FormGroup = new FormGroup({});
  salle:any[] = [];

  ngOnInit(): void {
    this.sallesService.getAll().subscribe((res:any) =>{
      this.salle = res;
      console.log(res);
    })	
    this.createForm();
  }
  
  createForm() {
    this.salleForm = this.formBuilder.group({
      nom: ['', Validators.required]
    });
  }

  onSubmit(){
    this.sallesService.add(this.salleForm.value).subscribe(res =>{
      if (res != null){
        Swal.fire({
          icon: 'success',
          title: 'Salle ajoutéé ...',
          text: 'La sale est ajoutée avec succés !',
        })

        this.closeModal();
        this.ngOnInit();
        this.salleForm.reset();
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