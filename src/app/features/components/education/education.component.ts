import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ApiService} from "../../../core/shared/services/api.service";
import {AuthService} from "../../../core/shared/services/auth.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  env = environment;

  educationForm: FormGroup;

  editDialog: boolean | undefined;
  deleteDialog: boolean | undefined;
  editable: boolean | undefined = false;
  deleteBonus: boolean | undefined = false;

  educations: any;
  educationButtonHeader: string = 'Add education';
  educationHeader: string = 'Education';
  isLoading: boolean = false;

  constructor(private fb: FormBuilder,
              private api: ApiService,
              private auth: AuthService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.educationForm = new FormGroup({
      id: new FormControl(null),
      college: new FormControl(null),
      degree: new FormControl(null),
      specialization: new FormControl(null),
      gpa: new FormControl(null),
      studyFrom: new FormControl(null),
      studyTo: new FormControl(null)
    })
  }

  getUserEducationInfo(): void {
    // this.api.fetchUserJobInfo(this.auth.getId()).subscribe(result => {
    //   this.bonuses = result.bonuses;
    //   this.isLoading = false;
    // }, error => {
    //   this.messageService.add({
    //     severity: 'error',
    //     detail: error.error.errorMessage
    //   });
    // })
  }

}
