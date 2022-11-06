import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../../../core/shared/services/api.service";
import {MessageService} from "primeng/api";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../core/shared/services/auth.service";

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


  @ViewChild('gdprUpload') gdprUpload: any;
  @ViewChild('affirmationUpload') affirmationUpload: any;

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
        email: new FormControl(null, [Validators.required, Validators.email]),
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

  hideProfileDialog() {
    this.profileEdit = false;
    this.profileForm.reset();
    this.getUserInfo();
  }

  updateProfile() {
    let userDTO = this.profileForm.value;
    this.api.updateUserInfo(this.auth.getId(), userDTO).subscribe(result => {
        this.messageService.add({
          severity: 'success',
          detail: "Η ενημέρωση έγινε με επιτυχία.",
        });
        this.userInfoView = false;
        this.getUserInfo();
        this.profileEdit = false;
      },
      error => {
        this.messageService.add({
          severity: 'error',
          detail: "Υπήρξε κάποιο σφάλμα!",
        });
      })
  }

  editProfile() {
    this.profileEdit = true;
  }

  getGdpr() {
    // this.api.getGdprFile().subscribe(response => {
    //   let file = new Blob([response], {type: 'application/pdf'});
    //   let fileURL = URL.createObjectURL(file);
    //   window.open(fileURL);
    // });
  }

  getAffirmation() {
    // this.api.getAffirmationFile().subscribe(response => {
    //   let file = new Blob([response], {type: 'application/pdf'});
    //   let fileURL = URL.createObjectURL(file);
    //   window.open(fileURL);
    // });
  }

  onSelect(event: any, fileName: string, whichFile: string) {

    for (let file of event.files) {

      this.getBase64(file).then(base64encoded => {
        let base64encodedString = base64encoded as string;
        let base64Format = base64encodedString.split(',')[1];

        // @ts-ignore
        this[fileName].setValue({
          file: base64Format,
          originalFileName: file.name,
          mimeType: file.type
        });

        // @ts-ignore
        this[fileName].updateValueAndValidity();

        whichFile === 'gdprFile' ? this.isGdprFileUpload = true : this.isAffirmationFileUpload = true;
      });
    }
  }

  getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  updateGdprFile(): void {
    let gdprFileDTO = this.gdprFile.value;

    // this.api.updateGdprFile(gdprFileDTO).subscribe(result => {
    //   this.messageService.add({
    //     severity: 'success',
    //     detail: this.translate.instant('PROFILE.UPDATE_GDPR_FILE'),
    //   });
    //
    //   this.isGdprFileUpload = false;
    //   this.gdprUpload.clear();
    //
    // }, error => {
    //   console.log('error', error)
    // })
  }

  updateAffirmationFile(): void {
    let affirmationFileDTO = this.affirmationFile.value;

    // this.api.updateAffirmationFile(affirmationFileDTO).subscribe(result => {
    //   this.messageService.add({
    //     severity: 'success',
    //     detail: this.translate.instant('PROFILE.UPDATE_AFFIRMATION_FILE'),
    //   });
    //   this.isAffirmationFileUpload = false;
    //   this.affirmationUpload.clear();
    //
    // }, error => {
    //   console.log('error', error)
    // })
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

  get email(): FormControl {
    return this.basicInformation.get('email') as FormControl;
  }

  get gdprFile() {
    return this.basicInformation.get('gdprFile') as FormGroup;
  }

  get affirmationFile() {
    return this.basicInformation.get('affirmationFile') as FormGroup;
  }

  get type() {
    return this.gdprFile.get('type') as FormControl;
  }

}
