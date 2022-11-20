import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

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

  constructor() {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.jobForm = new FormGroup({
      jobInformation: new FormGroup({
        id: new FormControl(null),
        hireDate: new FormControl(null),
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
}
