import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../environments/environment";
import {Router} from "@angular/router";
import {AuthService} from "../../../core/shared/services/auth.service";
import {MessageService} from "primeng/api";
import {ApiService} from "../../../core/shared/services/api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // @ts-ignore
  loginForm: FormGroup;
  env = environment;

  constructor(private api: ApiService,
              private router: Router,
              private auth: AuthService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  submit(): void {
    this.api.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(result => {
          this.auth.setAuthDetails(result);
          // this.auth.startTokenExpirationCounter();

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
