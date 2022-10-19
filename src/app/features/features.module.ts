import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import {SelectButtonModule} from "primeng/selectbutton";
import {SplitButtonModule} from "primeng/splitbutton";
import {CheckboxModule} from "primeng/checkbox";
import {DividerModule} from "primeng/divider";
import {FieldsetModule} from "primeng/fieldset";
import {ButtonModule} from "primeng/button";
import {SidebarModule} from "primeng/sidebar";
import {DropdownModule} from "primeng/dropdown";
import {TooltipModule} from "primeng/tooltip";
import {InputSwitchModule} from "primeng/inputswitch";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextareaModule} from "primeng/inputtextarea";
import {CalendarModule} from "primeng/calendar";
import {SkeletonModule} from "primeng/skeleton";
import {MultiSelectModule} from "primeng/multiselect";
import {FileUploadModule} from "primeng/fileupload";
import {ChipModule} from "primeng/chip";
import {DialogModule} from "primeng/dialog";
import {ScrollPanelModule} from "primeng/scrollpanel";
import {BadgeModule} from "primeng/badge";
import {ToolbarModule} from "primeng/toolbar";
import {ScrollTopModule} from "primeng/scrolltop";
import {ToastModule} from "primeng/toast";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {MessagesModule} from "primeng/messages";
import {MessageModule} from "primeng/message";
import {ConfirmationService, MessageService, SharedModule} from "primeng/api";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {FeaturesRoutingModule} from "./features-routing.module";
import {PanelModule} from "primeng/panel";
import {ToggleButtonModule} from "primeng/togglebutton";
import {PasswordModule} from "primeng/password";
import {LoginComponent} from "../login/login.component";
import {HomeComponent} from "../home/home.component";

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    DividerModule,
    InputTextModule,
    FieldsetModule,
    ButtonModule,
    TableModule,
    SidebarModule,
    SelectButtonModule,
    DropdownModule,
    SplitButtonModule,
    TooltipModule,
    InputSwitchModule,
    CheckboxModule,
    InputNumberModule,
    InputTextareaModule,
    MultiSelectModule,
    CalendarModule,
    FileUploadModule,
    ChipModule,
    SkeletonModule,
    DialogModule,
    ScrollPanelModule,
    BadgeModule,
    ToolbarModule,
    ScrollTopModule,
    ToastModule,
    ProgressSpinnerModule,
    MessagesModule,
    MessageModule,
    FeaturesRoutingModule,
    SharedModule,
    ScrollTopModule,
    OverlayPanelModule,
    PanelModule,
    ToggleButtonModule,
    PasswordModule
  ],
  providers: [
    // DecisionFormService,
    MessageService,
    ConfirmationService
  ]
})
export class FeaturesModule {
}
