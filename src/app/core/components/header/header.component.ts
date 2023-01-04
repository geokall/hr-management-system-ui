import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {MenuItem, MessageService} from "primeng/api";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public menuItems: MenuItem[] = [];
  env = environment;

  constructor(public auth: AuthService,
              public router: Router,
              private messageService: MessageService) {
    this.auth.authStatusChanged.subscribe(result => this.initMenuItems());
  }

  ngOnInit() {
    this.initMenuItems();
    // this.auth.startTokenExpirationCounter();
  }

  initMenuItems() {
    this.menuItems = [{
      label: 'Home',
      icon: 'pi pi-home',
      routerLink: ['/'],
      routerLinkActiveOptions: {exact: true},
      visible: this.auth.isLoggedIn()
    },
      // {
      //   label: 'Υπάλληλος',
      //   icon: 'pi pi-file-o',
      //   routerLinkActiveOptions: {exact: false},
      //   visible: this.auth.isLoggedIn(),
      //   items: [
      //     {label: 'Εγγραφή νέου φοιτητή', icon: 'pi pi-plus-circle', routerLink: 'actions/create'},
      //   ]
      // },
      {
        label: 'My Info',
        icon: 'pi pi-database',
        routerLink: '/user-personal',
        visible: this.auth.isLoggedIn()
      },
      {
        label: 'People',
        icon: 'pi pi-users',
        routerLink: '/search-people',
        visible: this.auth.isLoggedIn()
      },
      {
        label: 'Invitation',
        icon: 'pi pi-send',
        routerLink: '/user-invitation',
        visible: this.auth.isLoggedIn() && this.auth.isAdmin()
      },
      {
        label: 'Password',
        icon: 'pi pi-key',
        routerLink: '/password-change',
        visible: this.auth.isLoggedIn()
      }
    ]
  }

  logout(): void {
    this.auth.logout();
    this.messageService.add({severity: 'success', detail: 'Logout successfully.'});
    this.router.navigateByUrl('/login');
  }

  login(): void {
    this.router.navigateByUrl('/login');
  }

}
