import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {JobInformationDTO} from "../../../core/shared/models/dto/job-information-dto";
import {BonusDTO} from "../../../core/shared/models/dto/bonus-dto";
import {ApiService} from "../../../core/shared/services/api.service";
import {AuthService} from "../../../core/shared/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {FileDTO} from "../../../core/shared/models/dto/file-dto";

@Component({
  selector: 'app-user-file',
  templateUrl: './user-file.component.html',
  styleUrls: ['./user-file.component.scss']
})
export class UserFileComponent implements OnInit {

  env = environment;

  fileForm: FormGroup;
  resetJobValue: JobInformationDTO;

  fileResponse: BonusDTO[];

  isEditMode: boolean = false;
  saving: boolean = false;

  uploadedFiles: any[] = [];

  minioUrl: string;

  @Output() fileFormOutput = new EventEmitter<FormGroup>();
  @Output() fileValue = new EventEmitter<any>();


  constructor(private fb: FormBuilder,
              private api: ApiService,
              private auth: AuthService,
              private activatedRoute: ActivatedRoute,
              public router: Router,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.minioUrl = this.env.apiUrl.concat('/minio/update-bucket');
  }

  initForm(): void {
    this.fileForm = new FormGroup({
      file: new FormGroup({
        actualFile: new FormControl(null),
        fileName: new FormControl(null),
        mimeType: new FormControl(null)
      })
    })
  }

  onSelect(event: { files: any; }) {
    for (let file of event.files) {
      // @ts-ignore
      this.uploadedFiles.push(file);

      this.getBase64(file).then(base64encoded => {
        let base64encodedString = base64encoded as string;
        let base64Format = base64encodedString.split(',')[1];
        this.getActualFile.patchValue(base64Format);
        this.getFileName.patchValue(file.name);
        this.getMimeType.patchValue(file.type);
      })
    }
  }

  getBase64(file: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  get getFile() {
    return this.fileForm.get('file') as FormGroup;
  }

  get getActualFile() {
    return this.getFile.get('actualFile') as FormControl;
  }

  get getFileName() {
    return this.getFile.get('fileName') as FormControl;
  }

  get getMimeType() {
    return this.getFile.get('mimeType') as FormControl;
  }

  clearForm() {
    this.uploadedFiles = [];
  }

  onUpload($event: any) {
    console.log(this.getFileName.value)
    let dto = this.getFile.value as FileDTO;
    this.api.uploadToMinio(dto).subscribe(result => {

      this.messageService.add({
        severity: 'info',
        summary: 'File Uploaded successfully'
      });
    }, error => {
      this.messageService.add({
        severity: 'error',
        detail: error.error.errorMessage
      });
    })

  }
}