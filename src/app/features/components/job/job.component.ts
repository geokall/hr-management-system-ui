import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {EthnicityEnum} from "../../../core/shared/models/enums/ethnicity-enum";
import {JobCategoryEnum} from "../../../core/shared/models/enums/job-category-enum";

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

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

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.jobForm = new FormGroup({
      jobInformation: new FormGroup({
        id: new FormControl(null),
        hireDate: new FormControl(null),
        ethnicity: new FormControl(null),
        jobCategory: new FormControl(null),
        jobDescription: new FormControl(null),
        bonuses: this.fb.array([])
      })
    })

    //to be added on fetch endpoint
    this.jobFormOutput.emit(this.jobForm);
    this.jobFormValue.emit(null)
  }

  get jobInformation(): FormGroup {
    return this.jobForm.get('jobInformation') as FormGroup;
  }

  get hireDate(): FormControl {
    return this.jobInformation.get('hireDate') as FormControl;
  }

  get ethnicity(): FormControl {
    return this.jobInformation.get('ethnicity') as FormControl;
  }

  get jobCategory(): FormControl {
    return this.jobInformation.get('jobCategory') as FormControl;
  }

  get jobDescription(): FormControl {
    return this.jobInformation.get('jobDescription') as FormControl;
  }
}
