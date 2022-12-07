import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from "../../../core/shared/services/api.service";
import {MessageService} from "primeng/api";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../core/shared/services/auth.service";
import {environment} from "../../../../environments/environment";
import {GenderEnum} from "../../../core/shared/models/enums/gender-enum";
import {MaritalStatusEnum} from "../../../core/shared/models/enums/marital-status-enum";
import {EducationDTO} from "../../../core/shared/models/dto/education-dto";

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

  educationResponse: EducationDTO[];

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

  constructor(private fb: FormBuilder,
              private api: ApiService,
              private auth: AuthService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getUserInfo();
  }

  initForm(): void {
    this.personalForm = new FormGroup({
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
      facebookUrl: new FormControl(null),
      educations: this.fb.array([])
    })
  }

  getUserInfo() {
    this.api.getPersonalInfo(this.auth.getId()).subscribe(userInfo => {
      this.personalForm.patchValue(userInfo);

      this.userInfoView = true;

      this.educationResponse = userInfo.educations;

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
          detail: 'Personal information updated successfully.',
        });
      },
      error => {
        this.saving = false;
        this.successModal = false;

        this.messageService.add({
          severity: 'error',
          detail: error.error.errorMessage
        });
      })
  }

  onClear(): void {
    // this.form.reset(this.studentForm);
  }

  get username(): FormControl {
    return this.personalForm.get('username') as FormControl;
  }

  get name(): FormControl {
    return this.personalForm.get('name') as FormControl;
  }

  get birthDate(): FormControl {
    return this.personalForm.get('birthDate') as FormControl;
  }

  get role(): FormControl {
    return this.personalForm.get('role') as FormControl;
  }

  get vatNumber(): FormControl {
    return this.personalForm.get('vatNumber') as FormControl;
  }

  get surname(): FormControl {
    return this.personalForm.get('surname') as FormControl;
  }

  get businessEmail(): FormControl {
    return this.personalForm.get('businessEmail') as FormControl;
  }

  get personalEmail(): FormControl {
    return this.personalForm.get('personalEmail') as FormControl;
  }

  get gender(): FormControl {
    return this.personalForm.get('gender') as FormControl;
  }

  get maritalStatus(): FormControl {
    return this.personalForm.get('maritalStatus') as FormControl;
  }

  get street1() {
    return this.personalForm.get('street1') as FormControl;
  }

  get street2() {
    return this.personalForm.get('street2') as FormControl;
  }

  get city() {
    return this.personalForm.get('city') as FormControl;
  }

  get province() {
    return this.personalForm.get('province') as FormControl;
  }

  get postalCode() {
    return this.personalForm.get('postalCode') as FormControl;
  }

  get country() {
    return this.personalForm.get('country') as FormControl;
  }

  get workNumber() {
    return this.personalForm.get('workNumber') as FormControl;
  }

  get mobileNumber() {
    return this.personalForm.get('mobileNumber') as FormControl;
  }

  get homeNumber() {
    return this.personalForm.get('homeNumber') as FormControl;
  }

  get linkedinUrl() {
    return this.personalForm.get('linkedinUrl') as FormControl;
  }

  get twitterUrl() {
    return this.personalForm.get('twitterUrl') as FormControl;
  }

  get facebookUrl() {
    return this.personalForm.get('facebookUrl') as FormControl;
  }

}
