import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  jobForm: FormGroup;

  @Input() selected: boolean;

  @Output() jobFormOutput = new EventEmitter<FormGroup>();

  constructor() {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.jobForm = new FormGroup({
      test: new FormGroup({})
    })

    this.jobFormOutput.emit(this.jobForm);
  }


}
