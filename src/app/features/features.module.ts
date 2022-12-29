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
import {ConfirmationService, MessageService} from "primeng/api";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {FeaturesRoutingModule} from "./features-routing.module";
import {PanelModule} from "primeng/panel";
import {ToggleButtonModule} from "primeng/togglebutton";
import {PasswordModule} from "primeng/password";
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {RegisterComponent} from "./components/register/register.component";
import {PersonalComponent} from "./components/profile/personal.component";
import {TabViewModule} from 'primeng/tabview';
import {ImageModule} from "primeng/image";
import {TabMenuModule} from "primeng/tabmenu";
import {InfoMenuComponent} from "./components/info-menu/info-menu.component";
import {MenubarModule} from "primeng/menubar";
import {JobComponent} from "./components/job/job.component";
import {UserInvitationComponent} from "./components/user-invitation/user-invitation.component";
import {BonusComponent} from "./components/bonus/bonus.component";
import {EducationComponent} from "./components/education/education.component";
import {WorkInformationComponent} from "./components/work-information/work-information.component";
import {CompensationComponent} from "./components/compensation/compensation.component";
import {SharedModule} from "../core/shared/shared.module";
import {PasswordComponent} from "./components/password/password.component";
import {SearchPeopleComponent} from "./components/search-people/search-people.component";

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    PersonalComponent,
    InfoMenuComponent,
    JobComponent,
    UserInvitationComponent,
    BonusComponent,
    EducationComponent,
    WorkInformationComponent,
    CompensationComponent,
    PasswordComponent,
    SearchPeopleComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
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
    PasswordModule,
    TabViewModule,
    ImageModule,
    TabMenuModule,
    MenubarModule
  ],
  providers: [
    // DecisionFormService,
    MessageService,
    ConfirmationService
  ]
})
export class FeaturesModule {
}
