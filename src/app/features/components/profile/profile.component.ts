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

  public userDetails = <any>{};
  profileForm: any;
  userInfoView: boolean = false;
  profileEdit: any;
  isGdprFileUpload = false;
  isAffirmationFileUpload = false;
  loading: boolean = false;


  @ViewChild('gdprUpload') gdprUpload: any;
  @ViewChild('affirmationUpload') affirmationUpload: any;

  constructor(private api: ApiService,
              private auth: AuthService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.userInfoView = false;


    this.getUser();
  }

  initForm(user: any): void {
    this.profileForm = new FormGroup({
      name: new FormControl(user.name, [
        Validators.required
      ])
    })
  }

  getUser() {
    // this.initForm(this.userDetails);

    this.api.getUserInfo(this.auth.getId())
      .subscribe(user => {
        // this.profileForm.reset(user);
        // @ts-ignore
        this.userDetails = user['user'];
        this.userInfoView = true;
        this.initForm(this.userDetails)
        console.log(this.userDetails)
      })
      .add(() => this.loading = false);

  }

  hideProfileDialog() {
    this.profileEdit = false;
    this.profileForm.reset();
    this.getUser();
  }

  updateProfile() {
    let user = this.profileForm.value;
    // this.api.updateUserProfile(user).subscribe(result => {
    //     console.log("success!", result);
    //     this.messageService.add({
    //       severity: 'success',
    //       detail: "Successful update!",
    //     });
    //     this.userInfoView = false;
    //     this.getUser();
    //     this.profileEdit = false;
    //   },
    //   error => {
    //     console.error("error", error);
    //     this.messageService.add({
    //       severity: 'error',
    //       detail: "Error with update!",
    //     });
    //   })
  }

  editProfile() {
    this.profileEdit = true;
  }


  get username() {
    return this.profileForm.get('username');
  }

  get name() {
    return this.profileForm.get('name');
  }

  get surname() {
    return this.profileForm.get('surname');
  }

  get email() {
    return this.profileForm.get('email');
  }

  get gdprFile() {
    return this.profileForm.get('gdprFile') as FormGroup;
  }

  get affirmationFile() {
    return this.profileForm.get('affirmationFile') as FormGroup;
  }

  get type() {
    return this.gdprFile.get('type') as FormControl;
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
    console.log(this.gdprUpload)

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

}
