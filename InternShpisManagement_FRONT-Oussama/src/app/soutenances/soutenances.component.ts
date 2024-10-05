import { Component, OnInit } from '@angular/core';
import { SoutenanceService } from '../services/soutenance.service';
import { SoutenanceResponse } from '../Responses/SoutenanceResponse';

@Component({
  selector: 'app-soutenances',
  templateUrl: './soutenances.component.html',
  styleUrls: ['./soutenances.component.css']
})
export class SoutenancesComponent implements OnInit {

  constructor(private soutenanceService:SoutenanceService){}

  soutenances:SoutenanceResponse[] = [];

  ngOnInit(): void {
    this.soutenanceService.getAll().subscribe((res:any) =>{
      this.soutenances = res;
      console.log(res);
    })	
  }
}  
