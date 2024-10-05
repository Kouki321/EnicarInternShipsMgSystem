import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnseignantsComponent } from './enseignants.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { EnseignantsRoutingModule } from './enseignants-routing.module';



@NgModule({
  declarations: [
    EnseignantsComponent,
    AddComponent,
    EditComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    EnseignantsRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class EnseignantsModule { }
