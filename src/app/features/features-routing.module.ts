import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../core/shared/guards/auth.guard";
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {InfoMenuComponent} from "./components/info-menu/info-menu.component";
import {UserInvitationComponent} from "./components/user-invitation/user-invitation.component";
import {PasswordComponent} from "./components/password/password.component";
import {SearchPeopleComponent} from "./components/search-people/search-people.component";
import {GeneralGuard} from "../core/shared/guards/general.guard";

const routes: Routes = [
  {
    path: 'actions',
    canActivate: [AuthGuard],
    children: []
  },
  {path: 'user-personal', component: InfoMenuComponent, canActivate: [AuthGuard]},
  {path: 'user-personal/:id', component: InfoMenuComponent, canActivate: [AuthGuard]},
  {path: 'search-people', component: SearchPeopleComponent, canActivate: [AuthGuard]},
  {path: 'user-invitation', component: UserInvitationComponent, canActivate: [AuthGuard, GeneralGuard]},
  {path: 'password-change', component: PasswordComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule {
}
