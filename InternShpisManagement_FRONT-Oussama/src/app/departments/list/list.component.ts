import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/services/department.service';
import { AddComponent } from '../add/add.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Department } from 'src/app/requests/Department';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit{


  constructor(private departmentService:DepartmentService,private formBuilder: FormBuilder){}

  departmentForm: FormGroup = new FormGroup({});
  updateForm: FormGroup = new FormGroup({});
  departments:any[] = [];
  filteredDepartments: any[] = [];

  idDepartment: number = 0;
  ngOnInit(): void {
    this.departmentService.getAll().subscribe(res =>{
      this.departments = res;
      this.filteredDepartments = res;
    })	
    this.createForm();
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


  openModal() {
    
    const modal = document.getElementById('exampleModal');
    if (modal) {
      modal.classList.add('show');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-hidden', 'false');
    }
  }


  createForm() {
    this.departmentForm = this.formBuilder.group({
      nom: ['', Validators.required]
    });

    this.updateForm = this.formBuilder.group({
      nom: ['', Validators.required]
    });
  }


  onSubmit(){
    console.log(this.departmentForm.value);
    this.departmentService.add(this.departmentForm.value).subscribe(res =>{
      if (res != null){
        Swal.fire({
          icon: 'success',
          title: 'Department ajoutéé ...',
          text: 'La départment est ajoutée avec succés !',
        })

        this.closeModal();
        this.ngOnInit();
        this.departmentForm.reset();
      }
    })
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
        this.departmentService.delete(id).subscribe((res:any) =>{
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
    this.departmentService.get(id).subscribe((res:Department) =>{
      this.idDepartment = res.id;
      this.updateForm.patchValue({nom:res.nom});

    })
  }

  onUpdate(){
    this.departmentService.update(this.updateForm.value,this.idDepartment).subscribe(res =>{
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
      this.filteredDepartments = [...this.departments];
      return;
    }

    this.filteredDepartments = this.departments.filter(department =>
      department.nom.toLowerCase().includes(searchTerm)
    );
  }
  




}
