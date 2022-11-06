import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {environment} from "../../../../environments/environment";
import {ApiService} from "../../../core/shared/services/api.service";
import {MessageService} from "primeng/api";
import {AuthService} from "../../../core/shared/services/auth.service";
import {Router} from "@angular/router";
import {RegisterDTO} from "../../../core/shared/models/dto/register-dto";

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

  constructor(private api: ApiService,
              private messageService: MessageService,
              public auth: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      surname: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      role: new FormControl('READER')
    });
  }

  register() {
    this.saving = true;
    const form = this.registerForm.value as RegisterDTO;
    this.registerForm.reset(form);

    let role = this.role.value;

    this.api.register(role, form).subscribe(result => {
      this.saving = false;
      this.messageService.add({
        severity: 'success',
        detail: 'Η Εγγραφή ολοκληρώθηκε με επιτυχία.'
      });
      this.router.navigateByUrl('/login');
    }, error => {
      this.saving = false;
      this.messageService.add({
        severity: 'error',
        detail: error.error.errorMessage
      });
    });
  }

  get role(): FormControl {
    return this.registerForm.get('role') as FormControl;
  }
}
