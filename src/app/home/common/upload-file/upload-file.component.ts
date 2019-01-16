import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';

// const URL = '/api/';
const URL = `${environment.serverUrl}/contract-boq/api/contract-boq-uploadFile`;

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  constructor() {
    this.uploader.onCompleteItem = (item, response, status, header) => {
      this.attachments.push(response);
      console.log(this.attachments)
    }
  }
  attachments = []

  @Output() fileNameEvent = new EventEmitter<string>();

  sendfileName() {
    this.fileNameEvent.emit(this.uploader.queue[0].file.name)
  }
  restFileName() {
    this.fileNameEvent.emit("")
  }

  ngOnInit() {
  }
  public uploader: FileUploader = new FileUploader({ url: URL });

  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }


}





