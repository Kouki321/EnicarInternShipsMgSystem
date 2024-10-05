import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SallesComponent } from './salles.component';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SallesRoutingModule } from './salles-routing.module';



@NgModule({
  declarations: [
    SallesComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SallesRoutingModule,
  ]
})
export class SallesModule { }
