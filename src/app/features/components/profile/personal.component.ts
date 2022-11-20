import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../../core/shared/services/api.service";
import {MenuItem, MessageService} from "primeng/api";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../core/shared/services/auth.service";
import {environment} from "../../../../environments/environment";
import {GenderEnum} from "../../../core/shared/models/enums/gender-enum";
import {MaritalStatusEnum} from "../../../core/shared/models/enums/marital-status-enum";

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

  @Input() activeItem: MenuItem;
  @Input() menuItems: MenuItem[];

  profileForm: FormGroup;
  userInfoView: boolean = false;
  profileEdit: boolean = false;
  loading: boolean = false;
  isEditMode: boolean = false;
  saving: boolean = false;
  successModal: boolean = false;

  genders: any[] = Object.keys(GenderEnum)
    .map((item) => {
      // @ts-ignore
      return {key: item, value: GenderEnum[item]}
    });

  maritalStatuses: any[] = Object.keys(MaritalStatusEnum)
    .map((item) => {
      // @ts-ignore
      return {key: item, value: MaritalStatusEnum[item]}
    });

  showDebug = environment.debug;

  constructor(private api: ApiService,
              private auth: AuthService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getUserInfo();
  }

  initForm(): void {
    this.profileForm = new FormGroup({
      basicInformation: new FormGroup({
        id: new FormControl(null),
        role: new FormControl(null),
        name: new FormControl(null, Validators.required),
        surname: new FormControl(null, Validators.required),
        businessEmail: new FormControl(null, [Validators.required, Validators.email]),
        personalEmail: new FormControl(null, [Validators.required, Validators.email]),
        username: new FormControl(null, Validators.required),
        birthDate: new FormControl(null),
        hireDate: new FormControl(null),
        workNumber: new FormControl(null, [Validators.pattern("^[0-9]*$")]),
        mobileNumber: new FormControl(null, [Validators.pattern("^[0-9]*$")]),
        homeNumber: new FormControl(null, [Validators.pattern("^[0-9]*$")]),
        vatNumber: new FormControl(null),
        gender: new FormControl(null),
        employeeStatus: new FormControl(null),
        jobStatus: new FormControl(null),
        maritalStatus: new FormControl(null),
        street1: new FormControl(null),
        street2: new FormControl(null),
        city: new FormControl(null),
        province: new FormControl(null),
        postalCode: new FormControl(null),
        country: new FormControl(null),
        linkedinUrl: new FormControl(null),
        twitterUrl: new FormControl(null),
        facebookUrl: new FormControl(null)
      })
    })
  }

  getUserInfo() {
    this.api.getUserInfo(this.auth.getId()).subscribe(userInfo => {
      this.profileForm.reset(userInfo);

      this.userInfoView = true;
    })
      .add(() => this.loading = false);
  }


  updateProfile() {
    this.saving = true;

    let userDTO = this.profileForm.value;
    this.api.updateUserInfo(this.auth.getId(), userDTO).subscribe(result => {
        this.successModal = true;
        this.saving = false;

        this.messageService.add({
          severity: 'success',
          detail: "Η ενημέρωση έγινε με επιτυχία.",
        });
        this.userInfoView = false;
        this.getUserInfo();
        this.profileEdit = false;
      },
      error => {
        this.saving = false;
        this.successModal = false;

        this.messageService.add({
          severity: 'error',
          detail: "Υπήρξε κάποιο σφάλμα!",
        });
      })
  }

  onClear(): void {
    // this.form.reset(this.studentForm);
  }

  get basicInformation(): FormGroup {
    return this.profileForm.get('basicInformation') as FormGroup;
  }

  get username(): FormControl {
    return this.basicInformation.get('username') as FormControl;
  }

  get name(): FormControl {
    return this.basicInformation.get('name') as FormControl;
  }

  get birthDate(): FormControl {
    return this.basicInformation.get('birthDate') as FormControl;
  }

  get role(): FormControl {
    return this.basicInformation.get('role') as FormControl;
  }

  get vatNumber(): FormControl {
    return this.basicInformation.get('vatNumber') as FormControl;
  }

  get surname(): FormControl {
    return this.basicInformation.get('surname') as FormControl;
  }

  get businessEmail(): FormControl {
    return this.basicInformation.get('businessEmail') as FormControl;
  }

  get personalEmail(): FormControl {
    return this.basicInformation.get('personalEmail') as FormControl;
  }

  get gender(): FormControl {
    return this.basicInformation.get('gender') as FormControl;
  }

  get maritalStatus(): FormControl {
    return this.basicInformation.get('maritalStatus') as FormControl;
  }

  get street1() {
    return this.basicInformation.get('street1') as FormControl;
  }

  get street2() {
    return this.basicInformation.get('street2') as FormControl;
  }

  get city() {
    return this.basicInformation.get('city') as FormControl;
  }

  get province() {
    return this.basicInformation.get('province') as FormControl;
  }

  get postalCode() {
    return this.basicInformation.get('postalCode') as FormControl;
  }

  get country() {
    return this.basicInformation.get('country') as FormControl;
  }

  get workNumber() {
    return this.basicInformation.get('workNumber') as FormControl;
  }

  get mobileNumber() {
    return this.basicInformation.get('mobileNumber') as FormControl;
  }

  get homeNumber() {
    return this.basicInformation.get('homeNumber') as FormControl;
  }

  get linkedinUrl() {
    return this.basicInformation.get('linkedinUrl') as FormControl;
  }

  get twitterUrl() {
    return this.basicInformation.get('twitterUrl') as FormControl;
  }

  get facebookUrl() {
    return this.basicInformation.get('facebookUrl') as FormControl;
  }

}
