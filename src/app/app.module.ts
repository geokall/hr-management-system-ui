import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {JwtModule} from '@auth0/angular-jwt';
import {environment} from "../environments/environment";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SharedModule} from "primeng/api";
import {HttpClientModule} from "@angular/common/http";
import {OAuthModule} from 'angular-oauth2-oidc';
import {CoreModule} from "./core/core.module";
import {FeaturesModule} from "./features/features.module";

export function tokenGetter() {
  return localStorage.getItem(environment.storedVarKeys.accessTokenKey);
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    FeaturesModule,
    SharedModule,
    OAuthModule.forRoot(),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: environment.allowedDomains,
        disallowedRoutes: environment.disallowedDomains
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
