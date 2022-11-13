import {Component, OnInit} from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {FormControl, FormGroup} from "@angular/forms";
import {ApiService} from "../../../core/shared/services/api.service";
import {AuthService} from "../../../core/shared/services/auth.service";

@Component({
  selector: 'app-info-menu',
  templateUrl: './info-menu.component.html',
  styleUrls: ['./info-menu.component.scss']
})
export class InfoMenuComponent implements OnInit {

  items: MenuItem[];
  activeItem: MenuItem;

  loading: boolean = false;
  saving: boolean = false;

  basicInfoForm: FormGroup;

  constructor(private api: ApiService,
              private auth: AuthService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.initMenuItems();
    this.initForm();
    this.retrieveMainInfo();
  }

  initMenuItems(): void {
    this.items = [
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

    this.activeItem = this.items[0];
  }

  initForm(): void {
    this.basicInfoForm = new FormGroup({
      workNumber: new FormControl(null),
      mobileNumber: new FormControl(null),
      businessEmail: new FormControl(null),
      hireDate: new FormControl(null),
      countDays: new FormControl(null),
      employeeNumber: new FormControl(null),
      jobStatus: new FormControl(null),
      division: new FormControl(null),
      location: new FormControl(null),
      manager: new FormGroup({
        id: new FormControl(null),
        profilePicture: new FormControl(null),
        name: new FormControl(null)
      }),
      directReports: new FormControl(null)
    })
  }

  retrieveMainInfo(): any {
    this.api.getMainInfo(this.auth.getId())
      .subscribe(result => {
          this.basicInfoForm.patchValue(result);
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

}
