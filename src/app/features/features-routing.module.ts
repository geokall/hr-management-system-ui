import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../core/shared/guards/auth.guard";
import {GeneralGuard} from "../core/shared/guards/general.guard";

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
  // {path: 'student-profile', component: StudentCreateComponent, canActivate: [AuthGuard]},
  // {path: 'student-password', component: PasswordComponent, canActivate: [AuthGuard]},
  // {path: 'login', component: LoginComponent},
  // {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule {
}
