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

  constructor(private fb: FormBuilder,
              private api: ApiService,
              private auth: AuthService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.initMenuItems();
    this.initForm();
    this.retrieveMainInfo();
  }

  initMenuItems(): void {
    this.menuItems = [
      {
        label: 'Personal',
        // icon: 'pi pi-fw pi-home',
        routerLink: ['/user-profile'],
        routerLinkActiveOptions: {exact: true},
        visible: this.auth.isLoggedIn()
      },
      {
        label: 'Job',
        // icon: 'pi pi-fw pi-calendar',
        routerLink: ['/job'],
        routerLinkActiveOptions: {exact: true},
        visible: this.auth.isLoggedIn()
      }
    ]

    // this.activeItem = this.menuItems[0];
  }

  initForm(): void {
    this.basicInfoForm = this.fb.group({
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
}
