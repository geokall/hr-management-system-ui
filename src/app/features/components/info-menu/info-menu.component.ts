import {Component, OnInit} from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {FormGroup} from "@angular/forms";
import {GenderEnum} from "../../../core/shared/models/enums/gender-enum";
import {environment} from "../../../../environments/environment";
import {ApiService} from "../../../core/shared/services/api.service";
import {AuthService} from "../../../core/shared/services/auth.service";

@Component({
  selector: 'app-info-menu',
  templateUrl: './info-menu.component.html',
  styleUrls: ['./info-menu.component.scss']
})
export class InfoMenuComponent implements OnInit {

  showDebug = environment.debug;

  items: MenuItem[];
  activeItem: MenuItem;

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

  constructor(private api: ApiService,
              private auth: AuthService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {

    this.items = [
      { label: 'Personal',
        // icon: 'pi pi-fw pi-home',
        routerLink: ['/user-profile'],
        routerLinkActiveOptions: {exact: true},
        visible: this.auth.isLoggedIn()
      },
      {label: 'Job',
        // icon: 'pi pi-fw pi-calendar',
        routerLink: ['/job'],
        routerLinkActiveOptions: {exact: true},
        visible: this.auth.isLoggedIn()
      }
    ]

    this.activeItem = this.items[0];

  }

}
