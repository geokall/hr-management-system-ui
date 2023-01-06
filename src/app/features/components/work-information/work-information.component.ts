import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {WorkInformationDTO} from "../../../core/shared/models/dto/work-information-dto";
import {ApiService} from "../../../core/shared/services/api.service";
import {AuthService} from "../../../core/shared/services/auth.service";
import {MessageService} from "primeng/api";
import {IdNameDTO} from "../../../core/shared/models/dto/id-name-dto";
import {JobStatusEnum} from "../../../core/shared/models/enums/job-status.enum";
import {getEnumByKey} from "../../../core/shared/utils/enumByKey";

@Component({
  selector: 'app-work-information',
  templateUrl: './work-information.component.html',
  styleUrls: ['./work-information.component.scss']
})
export class WorkInformationComponent implements OnInit {

  @Input() workInformationResponse: WorkInformationDTO[];
  @Input() directManager: any;
  @Input() mainMenuForm: FormGroup;
  @Input() editMode: boolean;

  workButtonHeader: string = 'Add Work information';
  workHeader: string = 'Work Information';

  env = environment;

  workForm: FormGroup;

  editDialog: boolean | undefined;
  deleteDialog: boolean | undefined;
  editable: boolean | undefined = false;
  deleteWork: boolean | undefined = false;
  isLoading: boolean = false;

  workInformations: WorkInformationDTO[];

  locations: IdNameDTO[];
  divisions: IdNameDTO[];
  managers: IdNameDTO[];

  jobStatuses: any[] = Object.keys(JobStatusEnum)
    .map((item) => {
      // @ts-ignore
      return {key: item, value: JobStatusEnum[item]}
    });

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
      effectiveDate: new FormControl(null, Validators.required),
      jobTitle: new FormControl(null),
      jobStatus: new FormControl(null),
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
    //Pending to fetch only corrects
    this.api.fetchUsers().subscribe(response => {
      this.managers = response;
    }, error => {
      this.messageService.add({
        severity: 'error',
        detail: error.error.errorMessage
      });
    })
  }

  fetchUserWorkInformations() {
    this.api.fetchUserWorkInformations(this.auth.getId()).subscribe(response => {
      this.workInformations = response;
    }, error => {
      this.messageService.add({
        severity: 'error',
        detail: error.error.errorMessage
      });
    })
  }

  updateMainInfoForm(): any {
    this.api.getMainInfo(this.auth.getId()).subscribe(result => {
        this.mainMenuForm.patchValue(result);
      },
      error => {
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

      this.fetchUserWorkInformations();
      this.workForm.reset();

      this.updateMainInfoForm();

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
    let workDTO = this.workForm.value as WorkInformationDTO;

    this.api.updateUserWorkInformation(workDTO.id, workDTO).subscribe(response => {
        this.editDialog = false;

        this.fetchUserWorkInformations();

        this.workForm.reset();

        this.updateMainInfoForm();

        this.messageService.add({
          severity: 'success',
          detail: 'Updated work information successfully.'
        });
      },
      error => {
        this.editDialog = false;

        this.messageService.add({
          severity: 'error',
          detail: error.error.errorMessage
        });
      })
  }

  removeWorkInformation() {
    let work = this.workForm.value;

    this.api.deleteUserWorkInformation(work.id).subscribe(response => {
        this.deleteDialog = false;
        this.fetchUserWorkInformations();
        this.workForm.reset();

        this.updateMainInfoForm();

        this.messageService.add({
          severity: 'success',
          detail: 'Work information deleted successfully.',
        });
      },
      error => {
        this.deleteDialog = false;

        this.messageService.add({
          severity: 'error',
          detail: error.error.errorMessage
        });
      })
  }

  get effectiveDate(): FormControl {
    return this.workForm.get('effectiveDate') as FormControl;
  }

  get jobTitle(): FormControl {
    return this.workForm.get('jobTitle') as FormControl;
  }

  get jobStatus(): FormControl {
    return this.workForm.get('jobStatus') as FormControl;
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

  get directReports(): FormArray {
    return this.mainMenuForm.get('directReports') as FormArray;
  }

  getEnumByKey(payType: any) {
    return getEnumByKey(payType, JobStatusEnum);
  }

}
