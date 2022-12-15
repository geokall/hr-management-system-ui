import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {WorkInformationDTO} from "../../../core/shared/models/dto/work-information-dto";
import {ApiService} from "../../../core/shared/services/api.service";
import {AuthService} from "../../../core/shared/services/auth.service";
import {MessageService} from "primeng/api";
import {IdNameDTO} from "../../../core/shared/models/dto/id-name-dto";

@Component({
  selector: 'app-work-information',
  templateUrl: './work-information.component.html',
  styleUrls: ['./work-information.component.scss']
})
export class WorkInformationComponent implements OnInit {

  @Input() workInformationResponse: WorkInformationDTO[];

  workButtonHeader: string = 'Add Work information';
  workHeader: string = 'Work Information';

  env = environment;

  workForm: FormGroup;

  editDialog: boolean | undefined;
  deleteDialog: boolean | undefined;
  editable: boolean | undefined = false;
  deleteWork: boolean | undefined = false;
  isLoading: boolean = false;

  workInformations: any;

  locations: IdNameDTO[];
  divisions: IdNameDTO[];
  managers: IdNameDTO[];

  constructor(private fb: FormBuilder,
              private api: ApiService,
              private auth: AuthService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.setWorkResponseByParent();
    this.fetchLocations();
    this.fetchDivisions();
    this.fetchUsersToReport();
  }

  initForm() {
    this.workForm = new FormGroup({
      id: new FormControl(null),
      effectiveDate: new FormControl(null),
      jobTitle: new FormControl(null),
      location: new FormControl(null),
      division: new FormControl(null),
      manager: new FormControl(null)
    })
  }

  setWorkResponseByParent() {
    this.workInformations = this.workInformationResponse;
  }

  fetchLocations() {
    this.api.fetchLocations().subscribe(response => {
      this.locations = response;
    }, error => {
      this.messageService.add({
        severity: 'error',
        detail: error.error.errorMessage
      });
    })
  }

  fetchDivisions() {
    this.api.fetchDivisions().subscribe(response => {
      this.divisions = response;
    }, error => {
      this.messageService.add({
        severity: 'error',
        detail: error.error.errorMessage
      });
    })
  }

  fetchUsersToReport() {
    this.api.fetchUsers().subscribe(response => {
      this.managers = response;
    }, error => {
      this.messageService.add({
        severity: 'error',
        detail: error.error.errorMessage
      });
    })
  }

  openNewDialog() {
    this.editable = false;
    this.deleteWork = false;
    this.editDialog = true;
  }

  hideDialog() {
    this.editDialog = false;
    this.deleteDialog = false;
    this.workForm.reset();
  }

  hideDeleteDialog() {
    this.editDialog = false;
    this.deleteDialog = false;
    this.workForm.reset();
  }

  editRow(row: any) {
    this.editable = true;
    this.deleteWork = false;
    this.workForm.patchValue(row);
    this.editDialog = true;
  }

  deleteRow(row: any) {
    this.deleteWork = true;
    this.editable = false;
    this.workForm.patchValue(row);
    this.deleteDialog = true;
  }

  saveWorkInformation() {
    this.editable = false;
    this.deleteWork = false;

    let workForm = this.workForm.value;
    let userId = this.auth.getId();

    this.api.createUserWorkInformation(userId, workForm).subscribe(result => {
      this.editDialog = false;

      this.fetchUsersToReport();
      this.workForm.reset();

      this.messageService.add({
        severity: 'success',
        detail: 'Work information updated successfully.',
      });
    }, error => {
      this.editDialog = false;

      this.messageService.add({
        severity: 'error',
        detail: error.error.errorMessage
      });
    })
  }

  updateWorkInformation() {

  }

  removeWorkInformation() {

  }

  get effectiveDate(): FormControl {
    return this.workForm.get('effectiveDate') as FormControl;
  }

  get jobTitle(): FormControl {
    return this.workForm.get('jobTitle') as FormControl;
  }

  get location(): FormGroup {
    return this.workForm.get('location') as FormGroup;
  }

  get locationName(): FormControl {
    return this.locationName.get('name') as FormControl;
  }

  get division(): FormGroup {
    return this.workForm.get('division') as FormGroup;
  }

  get divisionName(): FormControl {
    return this.division.get('name') as FormControl;
  }

  get manager(): FormGroup {
    return this.workForm.get('manager') as FormGroup;
  }

  get managerName(): FormControl {
    return this.manager.get('name') as FormControl;
  }
}
