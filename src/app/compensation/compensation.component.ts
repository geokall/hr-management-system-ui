import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {CompensationDTO} from "../core/shared/models/dto/compensation-dto";
import {ApiService} from "../core/shared/services/api.service";
import {AuthService} from "../core/shared/services/auth.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-compensation',
  templateUrl: './compensation.component.html',
  styleUrls: ['./compensation.component.scss']
})
export class CompensationComponent implements OnInit {

  @Input() compensationResponse: CompensationDTO[];

  compensationButtonHeader: string = 'Add Compensation';
  compensationHeader: string = 'Compensation';

  env = environment;

  compensationForm: FormGroup;

  editDialog: boolean | undefined;
  deleteDialog: boolean | undefined;
  editable: boolean | undefined = false;
  deleteCompensation: boolean | undefined = false;
  isLoading: boolean = false;

  compensations: CompensationDTO[];


  constructor(private fb: FormBuilder,
              private api: ApiService,
              private auth: AuthService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.setCompensationResponseByParent();
    this.fetchUserCompensations();
  }

  initForm() {
    this.compensationForm = new FormGroup({
      id: new FormControl(null),
      effectiveDate: new FormControl(null),
      payType: new FormControl(null),
      payRate: new FormControl(null),
      comment: new FormControl(null)
    })
  }

  setCompensationResponseByParent() {
    this.compensations = this.compensationResponse;
  }

  fetchUserCompensations() {
    this.api.fetchUserCompensations(this.auth.getId()).subscribe(response => {
      this.compensations = response;
    }, error => {
      this.messageService.add({
        severity: 'error',
        detail: error.error.errorMessage
      });
    })
  }

  openNewDialog() {
    this.editable = false;
    this.deleteCompensation = false;
    this.editDialog = true;
  }

  hideDialog() {
    this.editDialog = false;
    this.deleteDialog = false;
    this.compensationForm.reset();
  }

  hideDeleteDialog() {
    this.editDialog = false;
    this.deleteDialog = false;
    this.compensationForm.reset();
  }

  editRow(row: any) {
    this.editable = true;
    this.deleteCompensation = false;
    this.compensationForm.patchValue(row);
    this.editDialog = true;
  }

  deleteRow(row: any) {
    this.deleteCompensation = true;
    this.editable = false;
    this.compensationForm.patchValue(row);
    this.deleteDialog = true;
  }

  saveCompensation() {
    this.editable = false;
    this.deleteCompensation = false;

    let compensationFrom = this.compensationForm.value;
    let userId = this.auth.getId();

    this.api.createUserCompensation(userId, compensationFrom).subscribe(result => {
      this.editDialog = false;

      this.fetchUserCompensations();
      this.compensationForm.reset();

      this.messageService.add({
        severity: 'success',
        detail: 'Compensation updated successfully.',
      });
    }, error => {
      this.editDialog = false;

      this.messageService.add({
        severity: 'error',
        detail: error.error.errorMessage
      });
    })
  }

  updateCompensation() {
    let dto = this.compensationForm.value as CompensationDTO;

    this.api.updateUserCompensation(dto.id, dto).subscribe(response => {
        this.editDialog = false;

        this.fetchUserCompensations();

        this.compensationForm.reset();

        this.messageService.add({
          severity: 'success',
          detail: 'Updated compensation successfully.'
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

  removeCompensation() {
    let dto = this.compensationForm.value;

    this.api.deleteUserCompensation(dto.id).subscribe(response => {
        this.deleteDialog = false;
        this.fetchUserCompensations();
        this.compensationForm.reset();

        this.messageService.add({
          severity: 'success',
          detail: 'Compensation deleted successfully.',
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
    return this.compensationForm.get('effectiveDate') as FormControl;
  }

  get payType(): FormControl {
    return this.compensationForm.get('payType') as FormControl;
  }

  get payRate(): FormControl {
    return this.compensationForm.get('payRate') as FormControl;
  }

  get comment(): FormControl {
    return this.compensationForm.get('comment') as FormControl;
  }

}
