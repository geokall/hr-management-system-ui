import {AuthInterceptor} from './interceptors/auth.interceptor';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HourMinutesSecsPipe} from "./pipes/hour-minutes-secs.pipe";


@NgModule({
  declarations: [HourMinutesSecsPipe],
  imports: [
    CommonModule,

  ],
  exports: [HourMinutesSecsPipe],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
})
export class SharedModule {
}
