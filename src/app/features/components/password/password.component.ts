import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../core/shared/services/api.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {AuthService} from "../../../core/shared/services/auth.service";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  passwordForm: FormGroup;

  constructor(private api: ApiService,
              public auth: AuthService,
              private router: Router,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.passwordForm = new FormGroup({
      currentPassword: new FormControl(null),
      password: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      samePassword: new FormControl(null)
    });
  }

  submit() {
    this.api.changePassword(this.auth.getId(), this.passwordForm.value).subscribe(result => {
        this.messageService.add({
          severity: 'success',
          detail: "Password changed successfully.",
        });

        this.router.navigateByUrl('');
      },
      error => {
        this.messageService.add({
          severity: 'error',
          detail: error.error.errorMessage
        });
      });
  }

}
