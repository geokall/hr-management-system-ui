import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {environment} from "../../../../environments/environment";
import {ApiService} from "../../../core/shared/services/api.service";
import {MessageService} from "primeng/api";
import {AuthService} from "../../../core/shared/services/auth.service";
import {Router} from "@angular/router";
import {RegisterDTO} from "../../../core/shared/models/register-dto";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // @ts-ignore
  registerForm: FormGroup;
  env = environment;

  saving: boolean = false;
  loading: boolean = false;
  successModal: boolean = false;
  errorModal: boolean = false;
  isEditMode: boolean = false;

  constructor(private api: ApiService,
              private messageService: MessageService,
              public auth: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      surname: new FormControl(''),
      name: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),
      roleName: new FormControl('READER')
    });
  }

  closeDialogAndNavigateToLogin() {
    this.successModal = false;
    this.router.navigateByUrl('login')
  }

  register() {
    this.saving = true;
    const form = this.registerForm.value as RegisterDTO;
    this.registerForm.reset(form);

    this.api.register(form).subscribe(result => {
      this.successModal = true;
      this.saving = false;
      // this.router.navigateByUrl('login')
    }, error => {
      this.saving = false;
      this.successModal = false;
      this.messageService.add({
        severity: 'error',
        detail: error.error.errorMessage
      });
    });
  }
}
