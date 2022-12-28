import {AuthInterceptor} from './interceptors/auth.interceptor';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HourMinutesSecsPipe} from "./pipes/hour-minutes-secs.pipe";
import {EnumValuePipe} from "./pipes/enum-value.pipe";


@NgModule({
  declarations: [HourMinutesSecsPipe, EnumValuePipe],
  imports: [
    CommonModule,
  ],
  exports: [HourMinutesSecsPipe, EnumValuePipe],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
})
export class SharedModule {
}
