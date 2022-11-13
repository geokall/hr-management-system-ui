import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../core/shared/services/api.service";
import {MessageService} from "primeng/api";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../core/shared/services/auth.service";
import {environment} from "../../../../environments/environment";
import {GenderEnum} from "../../../core/shared/models/enums/gender-enum";
import {MaritalStatusEnum} from "../../../core/shared/models/enums/marital-status-enum";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  userInfoView: boolean = false;
  profileEdit: boolean = false;
  isGdprFileUpload = false;
  isAffirmationFileUpload = false;
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
        username: new FormControl(null, Validators.required),
        birthDate: new FormControl(null),
        hireDate: new FormControl(null),
        mobileNumber: new FormControl(null, [Validators.pattern("^[0-9]*$")]),
        vatNumber: new FormControl(null),
        gender: new FormControl(null),
        employeeStatus: new FormControl(null),
        jobStatus: new FormControl(null),
        maritalStatus: new FormControl(null)
      })
    })
  }

  getUserInfo() {
    this.api.getUserInfo(this.auth.getId())
      .subscribe(userInfo => {
        this.profileForm.reset(userInfo);

        this.userInfoView = true;
      })
      .add(() => this.loading = false);
  }


  updateProfile() {
    this.saving = true;

    let userDTO = this.profileForm.value;
    this.api.updateUserInfo(this.auth.getId(), userDTO)
      .subscribe(result => {
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

  get mobileNumber(): FormControl {
    return this.basicInformation.get('mobileNumber') as FormControl;
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

  get gdprFile() {
    return this.basicInformation.get('gdprFile') as FormGroup;
  }

  get affirmationFile() {
    return this.basicInformation.get('affirmationFile') as FormGroup;
  }

  get gender(): FormControl {
    return this.basicInformation.get('gender') as FormControl;
  }

  get maritalStatus(): FormControl {
    return this.basicInformation.get('maritalStatus') as FormControl;
  }

  get type() {
    return this.gdprFile.get('type') as FormControl;
  }

}
