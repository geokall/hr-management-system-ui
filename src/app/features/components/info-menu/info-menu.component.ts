import {Component, OnInit} from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ApiService} from "../../../core/shared/services/api.service";
import {AuthService} from "../../../core/shared/services/auth.service";
import {PersonalInformationDTO} from "../../../core/shared/models/dto/personal-information-dto";
import {getEnumByKey} from "../../../core/shared/utils/enumByKey";
import {JobStatusEnum} from "../../../core/shared/models/enums/job-status.enum";
import {ActivatedRoute, Router} from "@angular/router";

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
  personalFormValue: PersonalInformationDTO;

  activeIndex: number = 0;

  personalSelected: boolean = false;
  jobSelected: boolean = false;
  fileSelected: boolean = false;
  personHeader: string = 'Personal';
  jobHeader: string = 'Job';
  fileHeader: string = 'Files';

  constructor(private fb: FormBuilder,
              private api: ApiService,
              private activatedRoute: ActivatedRoute,
              public router: Router,
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
      jobTitle: new FormControl(null),
      workNumber: new FormControl(null),
      mobileNumber: new FormControl(null),
      businessEmail: new FormControl(null),
      hireDate: new FormControl(null),
      countYears: new FormControl(null),
      countMonths: new FormControl(null),
      countDays: new FormControl(null),
      employeeNumber: new FormControl(null),
      jobStatus: new FormControl(null),
      division: new FormControl(null),
      location: new FormControl(null),
      directManager: new FormGroup({
        id: new FormControl(null),
        profilePicture: new FormControl(null),
        managerId: new FormControl(null),
        name: new FormControl(null),
        surname: new FormControl(null),
        titleJob: new FormControl(null),
      }),
      directReports: this.fb.array([])
    })
  }

  retrieveMainInfo(): any {
    let id: number;
    let routeId = this.activatedRoute.snapshot.params['id'];

    if (routeId != null) {
      id = routeId;
    } else {
      id = this.auth.getId();
    }

    this.api.getMainInfo(id).subscribe(result => {
        this.basicInfoForm.patchValue(result);

        result.directReports.forEach(report => {
          this.directReports.push(this.fb.group({
            directReportUserId: report.directReportUserId,
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

  get jobTitle(): FormControl {
    return this.basicInfoForm.get('jobTitle') as FormControl;
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

  get managerId(): FormControl {
    return this.directManager.get('managerId') as FormControl;
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

  get directReportUserId(): FormArray {
    return this.personalForm.get('directReportUserId') as FormArray;
  }

  get personalName(): FormArray {
    return this.personalForm.get('name') as FormArray;
  }

  get personalSurname(): FormArray {
    return this.personalForm.get('surname') as FormArray;
  }

  get countYears(): FormControl {
    return this.basicInfoForm.get('countYears') as FormControl;
  }

  get countMonths(): FormControl {
    return this.basicInfoForm.get('countMonths') as FormControl;
  }

  get countDays(): FormControl {
    return this.basicInfoForm.get('countDays') as FormControl;
  }

  selectTab() {
    if (this.activeIndex == 0) {
      this.personalSelected = true;
      this.jobSelected = false;
      this.fileSelected = false;

      this.personalForm.patchValue(this.personalFormValue);
    }
    if (this.activeIndex == 1) {
      this.jobSelected = true;
      this.personalSelected = false;
      this.fileSelected = false;
    }
    if (this.activeIndex == 2) {
      this.fileSelected = true;
      this.personalSelected = false;
      this.jobSelected = false;
    }
  }

  setNameAndSurname(): string {
    if (this.name?.value !== null) {
      return this.name?.value + ' ' + this.surname?.value;
    } else {
      return 'Name and Surname have not been modified yet.';
    }
  }

  setJobTitle(): any {
    if (this.jobTitle?.value !== null && this.jobTitle?.value != '') {
      return ' - ' + this.jobTitle.value;
    } else {
      return '';
    }
  }

  getEnumByKey(payType: any) {
    return getEnumByKey(payType, JobStatusEnum);
  }
}
