import { Component, OnInit } from '@angular/core';
import { SoutenanceService } from '../services/soutenance.service';
import { SoutenanceResponse } from '../Responses/SoutenanceResponse';
import { AuthService } from '../services/auth.service';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-soutenances-etud',
  templateUrl: './soutenances-etud.component.html',
  styleUrls: ['./soutenances-etud.component.css']
})
export class SoutenancesEtudComponent implements OnInit {

  constructor(private soutenanceService:SoutenanceService,private authService:AuthService, private noteService:NoteService){}

  soutenance!:SoutenanceResponse;
  note = 0;
  ngOnInit(): void {
    this.authService.get(this.authService.loggedUser).subscribe((res:any)=>{
      this.soutenanceService.getByEtud(res.body.userId).subscribe((result:any) =>{
        this.soutenance = result;
        this.noteService.getByEtud(res.body.userId).subscribe((note:any)=>{
          console.log(note);
          this.note = note.note
        })
        
      })	
    })

  }
}  
