import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../core/shared/services/api.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-invitation',
  templateUrl: './user-invitation.component.html',
  styleUrls: ['./user-invitation.component.scss']
})
export class UserInvitationComponent implements OnInit {

  invitationForm: FormGroup;

  constructor(private api: ApiService,
              private router: Router,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.invitationForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  submit() {
    this.api.invite(this.invitationForm.value.email).subscribe(result => {
        this.messageService.add({
          severity: 'success',
          detail: "Invitation sent successfully.",
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
