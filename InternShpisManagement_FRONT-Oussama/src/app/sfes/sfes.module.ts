import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SfesComponent } from './sfes.component';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SfesRoutingModule } from './sfes-routing.module';




@NgModule({
  declarations: [
    SfesComponent,
    ListComponent
  ],
  imports: [
    CommonModule,  
    SfesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class SfesModule { }