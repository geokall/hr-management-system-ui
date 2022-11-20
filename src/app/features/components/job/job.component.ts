import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  @Input() jobForm: FormGroup;
  @Input() personalForm: FormGroup;
  @Input() selected: boolean;

  constructor() {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.jobForm = new FormGroup({
      test: new FormGroup({})
    })
  }

  test(): void {
    if (this.selected) {
      this.personalForm.reset();
    }
  }


}
