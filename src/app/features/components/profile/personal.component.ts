import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from "../../../core/shared/services/api.service";
import {MessageService} from "primeng/api";
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

  personalForm: FormGroup;

  @Input() selected: boolean;

  @Output() personalFormOutput = new EventEmitter<FormGroup>();
  @Output() personalFormValue = new EventEmitter<any>();

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
    this.personalForm = new FormGroup({
      personalInformation: new FormGroup({
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
    this.api.getPersonalInfo(this.auth.getId()).subscribe(userInfo => {
      this.personalForm.patchValue(userInfo);

      this.userInfoView = true;

      this.personalFormOutput.emit(this.personalForm);
      this.personalFormValue.emit(userInfo);
    }).add(() => this.loading = false);
  }

  updateProfile() {
    this.saving = true;

    let userDTO = this.personalForm.value;
    this.api.updateUserPersonalInfo(this.auth.getId(), userDTO).subscribe(result => {
        this.successModal = true;
        this.saving = false;
        this.userInfoView = false;
        this.profileEdit = false;

        this.getUserInfo();

        this.messageService.add({
          severity: 'success',
          detail: "Η ενημέρωση έγινε με επιτυχία.",
        });
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

  get personalInformation(): FormGroup {
    return this.personalForm.get('personalInformation') as FormGroup;
  }

  get username(): FormControl {
    return this.personalInformation.get('username') as FormControl;
  }

  get name(): FormControl {
    return this.personalInformation.get('name') as FormControl;
  }

  get birthDate(): FormControl {
    return this.personalInformation.get('birthDate') as FormControl;
  }

  get role(): FormControl {
    return this.personalInformation.get('role') as FormControl;
  }

  get vatNumber(): FormControl {
    return this.personalInformation.get('vatNumber') as FormControl;
  }

  get surname(): FormControl {
    return this.personalInformation.get('surname') as FormControl;
  }

  get businessEmail(): FormControl {
    return this.personalInformation.get('businessEmail') as FormControl;
  }

  get personalEmail(): FormControl {
    return this.personalInformation.get('personalEmail') as FormControl;
  }

  get gender(): FormControl {
    return this.personalInformation.get('gender') as FormControl;
  }

  get maritalStatus(): FormControl {
    return this.personalInformation.get('maritalStatus') as FormControl;
  }

  get street1() {
    return this.personalInformation.get('street1') as FormControl;
  }

  get street2() {
    return this.personalInformation.get('street2') as FormControl;
  }

  get city() {
    return this.personalInformation.get('city') as FormControl;
  }

  get province() {
    return this.personalInformation.get('province') as FormControl;
  }

  get postalCode() {
    return this.personalInformation.get('postalCode') as FormControl;
  }

  get country() {
    return this.personalInformation.get('country') as FormControl;
  }

  get workNumber() {
    return this.personalInformation.get('workNumber') as FormControl;
  }

  get mobileNumber() {
    return this.personalInformation.get('mobileNumber') as FormControl;
  }

  get homeNumber() {
    return this.personalInformation.get('homeNumber') as FormControl;
  }

  get linkedinUrl() {
    return this.personalInformation.get('linkedinUrl') as FormControl;
  }

  get twitterUrl() {
    return this.personalInformation.get('twitterUrl') as FormControl;
  }

  get facebookUrl() {
    return this.personalInformation.get('facebookUrl') as FormControl;
  }

}
