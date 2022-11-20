import {Component, OnInit} from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ApiService} from "../../../core/shared/services/api.service";
import {AuthService} from "../../../core/shared/services/auth.service";

@Component({
  selector: 'app-info-menu',
  templateUrl: './info-menu.component.html',
  styleUrls: ['./info-menu.component.scss']
})
export class InfoMenuComponent implements OnInit {

  menuItems: MenuItem[];
  activeItem: MenuItem;

  loading: boolean = false;
  saving: boolean = false;

  basicInfoForm: FormGroup;

  personalForm: FormGroup;
  personalValue: any;
  jobForm: FormGroup;

  activeIndex: number = 0;

  personalSelected: boolean = false;
  jobSelected: boolean = false;
  personHeader: string = 'Personal';
  jobHeader: string = 'Job';

  constructor(private fb: FormBuilder,
              private api: ApiService,
              private auth: AuthService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.retrieveMainInfo();
  }

  initForm(): void {
    this.basicInfoForm = this.fb.group({
      id: new FormControl(null),
      name: new FormControl(null),
      surname: new FormControl(null),
      workNumber: new FormControl(null),
      mobileNumber: new FormControl(null),
      businessEmail: new FormControl(null),
      hireDate: new FormControl(null),
      countDays: new FormControl(null),
      employeeNumber: new FormControl(null),
      jobStatus: new FormControl(null),
      division: new FormControl(null),
      location: new FormControl(null),
      directManager: new FormGroup({
        id: new FormControl(null),
        profilePicture: new FormControl(null),
        name: new FormControl(null),
        surname: new FormControl(null),
        titleJob: new FormControl(null),
      }),
      directReports: this.fb.array([])
    })
  }

  retrieveMainInfo(): any {
    this.api.getMainInfo(this.auth.getId()).subscribe(result => {
        this.basicInfoForm.patchValue(result);

        result.directReports.forEach(report => {
          this.directReports.push(this.fb.group({
            name: report.name,
            surname: report.surname
          }))
        })
      },
      error => {
        this.messageService.add({
          severity: 'error',
          detail: error.error.errorMessage
        });
      })
  }

  get id(): FormControl {
    return this.basicInfoForm.get('id') as FormControl;
  }

  get name(): FormControl {
    return this.basicInfoForm.get('name') as FormControl;
  }

  get surname(): FormControl {
    return this.basicInfoForm.get('surname') as FormControl;
  }

  get workNumber(): FormControl {
    return this.basicInfoForm.get('workNumber') as FormControl;
  }

  get mobileNumber(): FormControl {
    return this.basicInfoForm.get('mobileNumber') as FormControl;
  }

  get businessEmail(): FormControl {
    return this.basicInfoForm.get('businessEmail') as FormControl;
  }

  get hireDate(): FormControl {
    return this.basicInfoForm.get('hireDate') as FormControl;
  }

  get employeeNumber(): FormControl {
    return this.basicInfoForm.get('employeeNumber') as FormControl;
  }

  get jobStatus(): FormControl {
    return this.basicInfoForm.get('jobStatus') as FormControl;
  }

  get division(): FormControl {
    return this.basicInfoForm.get('division') as FormControl;
  }

  get location(): FormControl {
    return this.basicInfoForm.get('location') as FormControl;
  }

  get directManager(): FormGroup {
    return this.basicInfoForm.get('directManager') as FormGroup;
  }

  get managerName(): FormControl {
    return this.directManager.get('name') as FormControl;
  }

  get managerSurname(): FormControl {
    return this.directManager.get('surname') as FormControl;
  }

  get managerTitleJob(): FormControl {
    return this.directManager.get('titleJob') as FormControl;
  }

  get directReports(): FormArray {
    return this.basicInfoForm.get('directReports') as FormArray;
  }

  selectTab() {
    console.log(this.jobForm)
    this.personalForm.reset(this.personalForm)
    if (this.activeIndex == 0) {
      this.personalSelected = true;
      this.jobSelected = false;

      // this.transferPersonalForm(this.personalForm);
      // this.personalForm.reset(this.personalValue)

      // this.jobForm.patchValue(this.jobForm);
    }
    if (this.activeIndex == 1) {
      this.jobSelected = true;
      this.personalSelected = false;

      // this.transferJobForm(this.jobForm)
      // this.personalForm.patchValue(this.personalForm)

    }
  }

  transferPersonalForm(personalForm: FormGroup) {
    this.personalForm = personalForm;
    console.log(this.personalForm)
  }

  transferJobForm(jobForm: FormGroup) {
    this.jobForm = jobForm;
  }
}
