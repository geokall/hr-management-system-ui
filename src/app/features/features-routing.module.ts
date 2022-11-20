import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../core/shared/guards/auth.guard";
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {InfoMenuComponent} from "./components/info-menu/info-menu.component";
import {UserInvitationComponent} from "./components/user-invitation/user-invitation.component";

const routes: Routes = [
  {
    path: 'actions',
    canActivate: [AuthGuard],
    children: [
      // {
      //   path: 'create',
      //   component: StudentCreateComponent,
      //   canActivate: [AuthGuard, GeneralGuard]
      // },
      // {
      //   path: 'search',
      //   component: StudentSearchComponent,
      //   canActivate: [AuthGuard, GeneralGuard]
      // },
    ]
  },
  {path: 'user-personal', component: InfoMenuComponent, canActivate: [AuthGuard]},
  {path: 'user-invitation', component: UserInvitationComponent, canActivate: [AuthGuard]},
  // {path: 'student-password', component: PasswordComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  // {path: 'register', component: RegisterComponent},
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule {
}
