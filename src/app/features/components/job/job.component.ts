import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {EthnicityEnum} from "../../../core/shared/models/enums/ethnicity-enum";
import {JobCategoryEnum} from "../../../core/shared/models/enums/job-category-enum";
import {environment} from "../../../../environments/environment";
import {ApiService} from "../../../core/shared/services/api.service";
import {AuthService} from "../../../core/shared/services/auth.service";
import {MessageService} from "primeng/api";
import {JobInformationDTO} from "../../../core/shared/models/dto/job-information-dto";

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  env = environment;

  jobForm: FormGroup;

  @Input() selected: boolean;

  @Output() jobFormOutput = new EventEmitter<FormGroup>();
  @Output() jobFormValue = new EventEmitter<any>();

  ethnicities: any[] = Object.keys(EthnicityEnum)
    .map((item) => {
      // @ts-ignore
      return {key: item, value: EthnicityEnum[item]}
    });

  jobCategories: any[] = Object.keys(JobCategoryEnum)
    .map((item) => {
      // @ts-ignore
      return {key: item, value: JobCategoryEnum[item]}
    });

  isEditMode: boolean = false;
  saving: boolean = false;

  constructor(private fb: FormBuilder,
              private api: ApiService,
              private auth: AuthService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.fetchJobInfo();
  }

  initForm(): void {
    this.jobForm = new FormGroup({
      id: new FormControl(null),
        hireDate: new FormControl(null),
        ethnicity: new FormControl(null),
      jobCategory: new FormControl(null),
      jobDescription: new FormControl(null),
      bonuses: this.fb.array([])
    })

    //to be added on fetch endpoint
    this.jobFormOutput.emit(this.jobForm);
    this.jobFormValue.emit(null)
  }

  fetchJobInfo() {
    this.api.fetchUserJobInfo(this.auth.getId()).subscribe(result => {
      this.jobForm.reset(result);
    }, error => {
      this.messageService.add({
        severity: 'error',
        detail: error.error.errorMessage
      });
    })
  }

  updateJobInfo() {
    let dto = this.jobForm.value as JobInformationDTO;

    this.api.updateUserJobInformation(this.auth.getId(), dto).subscribe(result => {
      this.jobForm.reset();
      this.fetchJobInfo();

      this.messageService.add({
        severity: 'success',
        detail: 'Job information updated successfully.',
      });
    }, error => {

      this.messageService.add({
        severity: 'error',
        detail: error.error.errorMessage
      });
    })
  }

  onClear(): void {
    // this.form.reset(this.studentForm);
  }

  get hireDate(): FormControl {
    return this.jobForm.get('hireDate') as FormControl;
  }

  get ethnicity(): FormControl {
    return this.jobForm.get('ethnicity') as FormControl;
  }

  get jobCategory(): FormControl {
    return this.jobForm.get('jobCategory') as FormControl;
  }

  get jobDescription(): FormControl {
    return this.jobForm.get('jobDescription') as FormControl;
  }
}
