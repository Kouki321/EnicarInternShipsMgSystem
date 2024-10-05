import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/file.service';
import { AuthService } from '../services/auth.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { SfesService } from '../services/sfes.service';
import { ResponseFile } from '../Responses/ResponseFile';
import { saveAs } from 'file-saver';

const MIME_TYPES: { [key: string]: string } = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetxml.sheet',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
};
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})


export class DocumentsComponent implements OnInit {

  selectedFiles!: FileList | null;
  currentFile!: File | null;
  progress = 0;
  message = '';
  error = '';
  id : any;
  nb!: number;
  fileInfos!: ResponseFile [];
  verif:any;
  MIME_TYPES = {
    pdf: 'application/pdf',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetxml.sheet',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  }
  constructor(private uploadService: FileService, private authService: AuthService, private sfeService:SfesService) { }
  ngOnInit(): void {
    /*his.sfeService.getAllSfeByEtud(this.id).toPromise().then((res:any) =>{
      if (res == null)
        this.verif = false;
      else
        this.verif = true;
    })*/

    this.authService.get(this.authService.loggedUser).subscribe((res:any)=>{
      this.sfeService.getSFEByEtudId(res.body.userId).subscribe((result:any)=>{
        this.uploadService.getBySfe(result.id).subscribe((res: ResponseFile[]) =>
          {
            this.fileInfos = res;
            this.nb = this.fileInfos.length;
            console.log(this.fileInfos);
          });
      })
    })    
   
  }

  selectFile(event:any): void {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
    console.log(this.nb);
  }

  upload(): void {
    this.progress = 0;
    if (this.selectedFiles == null)
      return; 
    this.currentFile = this.selectedFiles.item(0);
    this.authService.get(this.authService.loggedUser).subscribe((res:any)=>{
      this.sfeService.getSFEByEtudId(res.body.userId).subscribe((result:any)=>{
        this.uploadService.upload(this.currentFile,result.id).subscribe(
          event => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * (event.loaded / event.total!));
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.ngOnInit();
              /*this.uploadService.getFile(this.id).toPromise().then((res: any[]) =>
              {
                this.fileInfos = res;
                this.nb = this.fileInfos.length;
               
              });*/
            }
          },
          err => {
            this.progress = 0;
            this.message = 'Could not upload the file!';
            this.currentFile = null;
          });
      })

    })

    this.selectedFiles = null;
  }

  test(url : String){
    console.log(url);
    this.uploadService.getFilee(url).toPromise().then((res:any) =>{
      console.log(res);
    })
  }



  downloadFile(id:any) {
    this.uploadService.downloadFile(id)
      .subscribe(data => {
        //save it on the client machine.
        saveAs(new Blob([data], {type: MIME_TYPES['pdf'] as string}));
        
      })
  }
}
