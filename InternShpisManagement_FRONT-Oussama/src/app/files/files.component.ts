import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/file.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResponseFile } from '../Responses/ResponseFile';
import { saveAs } from 'file-saver';

const MIME_TYPES: { [key: string]: string } = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetxml.sheet',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
};

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})


export class FilesComponent implements OnInit{



  constructor(private fileService:FileService,private formBuilder: FormBuilder){}

  departmentForm: FormGroup = new FormGroup({});
  updateForm: FormGroup = new FormGroup({});
  files:ResponseFile[] = [];
  filteredFiles: ResponseFile[] = [];


  ngOnInit(): void {
    this.fileService.getByFilesOrdered().subscribe((res:ResponseFile[])=>{
      this.files = res;
      this.filteredFiles = res;
    })
  }

  doFilter(event: any){
    const searchTerm = event.target.value.toLowerCase();

    if (searchTerm === '') {
      this.filteredFiles = [...this.files];
      return;
    }

    this.filteredFiles = this.files.filter(file =>
      file.name.toLowerCase().includes(searchTerm) ||
      file.etudiant.toLowerCase().includes(searchTerm) ||
      file.sfe.toLowerCase().includes(searchTerm) 
    );
  }

  downloadFile(id:any,name:any) {
    this.fileService.downloadFile(id)
      .subscribe(data => {
        //save it on the client machine.
        saveAs(new Blob([data], {type: MIME_TYPES['pdf'] as string}),name);
        
      })
  }
}
