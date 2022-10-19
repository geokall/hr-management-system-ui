// import { AppInfoDTO } from './../../../shared/models/app-info-dto.interface';
// import { environment } from './../../../../environments/environment';
import {Component, OnInit} from '@angular/core';
// import {Router} from '@angular/router';
// import {MenuItem, MessageService} from 'primeng/api';
// import {ApiService} from 'src/app/shared/api.service';
// import {AuthService} from 'src/app/shared/auth.service';
// import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // public menuItems: MenuItem[] = [];
  // env = environment;
  // appInfo: AppInfoDTO = {version: "?"};
  //
  // constructor(public auth: AuthService, public api: ApiService, public router: Router, private messageService: MessageService) {
  //   this.auth.authStatusChanged.subscribe(result => this.initMenuItems());
  // }
  //
  ngOnInit() {
  //   this.initMenuItems();
  //   this.auth.isAdmin();
  //   this.auth.startTokenExpirationCounter();
  //   this.getVersion();
  }
  //
  // getVersion() {
  //   this.api.getVersion().subscribe(res => this.appInfo = res, error => console.log(error));
  // }
  //
  // initMenuItems() {
  //   this.menuItems = [{
  //     label: 'Αρχική',
  //     icon: 'pi pi-home',
  //     routerLink: ['/'],
  //     routerLinkActiveOptions: {exact: true},
  //     visible: this.auth.isLoggedIn()
  //   },
  //     {
  //       label: 'Έγγραφα',
  //       icon: 'pi pi-file-o',
  //       routerLinkActiveOptions: {exact: false},
  //       visible: (this.auth.isLoggedIn() && !this.auth.isReader() && !this.auth.isExternalReader()),
  //       items: [
  //         {label: 'Εισαγωγή Νέου', icon: 'pi pi-plus-circle', routerLink: '/decisions/create'},
  //       ]
  //     },
  //     {label: 'Αναζήτηση', icon: 'pi pi-search', routerLink: '/decisions/search', visible: this.auth.isLoggedIn()},
  //     {
  //       label: 'Διαχείριση Χρηστών',
  //       icon: 'pi pi-users',
  //       routerLink: '/users-management',
  //       visible: (this.auth.isLoggedIn() && this.auth.isAdmin())
  //     },
  //     {
  //       label: "Οδηγός Χρήσης",
  //       icon: 'pi pi-download',
  //       visible: (this.auth.isLoggedIn()),
  //       command: ($event) => this.downloadManual($event),
  //     }
  //   ];
  // }
  //
  // logout(): void {
  //   this.auth.logout();
  //   this.messageService.add({severity: 'success', detail: 'Αποσυνδεθήκατε'});
  //   this.router.navigateByUrl('/login');
  // }
  //
  // login(): void {
  //   this.router.navigateByUrl('/login');
  // }
  //
  // downloadManual($event: any): void {
  //   let menuItem = $event.item as MenuItem;
  //   menuItem.disabled = true;
  //   let label = menuItem.label;
  //   menuItem.label = 'Παρακαλώ περιμένετε...';
  //
  //   this.api.downloadManualFile().subscribe(response => {
  //       let contentDisposition = response.headers.get('content-disposition');
  //
  //       let filename = contentDisposition ? decodeURI(contentDisposition.split(';')[1].split('filename')[1].split('=')[1].split("\"").join("").trim()) : 'Manual.pdf';
  //
  //       //----- download FILE
  //       // const objectUrl: string = URL.createObjectURL(response.body as Blob);
  //       // const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
  //
  //       // a.href = objectUrl;
  //       // a.download = filename;
  //       // document.body.appendChild(a);
  //       // a.click();
  //       // document.body.removeChild(a);
  //       // URL.revokeObjectURL(objectUrl);
  //       //-------- end downloed file
  //
  //       // open file in a new tab
  //       const fileURL = URL.createObjectURL(response.body as Blob);
  //       window.open(fileURL)
  //       //newWindow.document.write(`<title>Οδηγός Χρήσης ΤΝΠ</title><iframe src="${fileURL}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`)
  //     },
  //     (error: HttpErrorResponse) => {
  //       this.messageService.add({severity: 'error', detail: 'Σφάλμα κατά την ανάκτηση του αρχείου'});
  //     }).add(() => {
  //       // I know this is ridiculous, but hey, this is a recognised PrimeNG MenuItems problem! The menu cannot refresh one item
  //       menuItem.disabled = false;
  //       menuItem.label = label;
  //       let temp = this.menuItems;
  //       this.menuItems = [];
  //       setTimeout(() => this.menuItems = temp,10);
  //     })
  // }

}
