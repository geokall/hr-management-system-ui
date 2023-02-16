import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ApiService} from "../../../core/shared/services/api.service";
import {AuthService} from "../../../core/shared/services/auth.service";
import {MessageService} from "primeng/api";
import {EducationDTO} from "../../../core/shared/models/dto/education-dto";
import {DegreeEnum} from "../../../core/shared/models/enums/degree-enum";
import {getEnumByKey} from "../../../core/shared/utils/enumByKey";

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  @Input() educationResponse: EducationDTO[];
  @Input() editMode: boolean;

  educationButtonHeader: string = 'Add education';
  educationHeader: string = 'Education';

  env = environment;

  educationForm: FormGroup;

  editDialog: boolean | undefined;
  deleteDialog: boolean | undefined;
  editable: boolean | undefined = false;
  deleteEducation: boolean | undefined = false;
  isLoading: boolean = false;

  educations: any;

  degrees: any[] = Object.keys(DegreeEnum)
    .map((item) => {
      // @ts-ignore
      return {key: item, value: DegreeEnum[item]}
    });

  constructor(private fb: FormBuilder,
              private api: ApiService,
              private auth: AuthService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.setEducationResponseByParent();
  }

  initForm() {
    this.educationForm = new FormGroup({
      id: new FormControl(null),
      college: new FormControl(null),
      degree: new FormControl(null),
      specialization: new FormControl(null),
      gpa: new FormControl(null),
      studyFrom: new FormControl(null),
      studyTo: new FormControl(null)
    })
  }

  setEducationResponseByParent() {
    this.educations = this.educationResponse;
  }

  fetchUserEducations() {
    this.api.getUserEducations(this.auth.getId()).subscribe(result => {
      this.educations = result;
      this.isLoading = false;
    }, error => {
      this.messageService.add({
        severity: 'error',
        detail: error.error.errorMessage
      });
    })
  }

  openNewDialog() {
    this.editable = false;
    this.deleteEducation = false;
    this.editDialog = true;
  }

  hideDialog() {
    this.editDialog = false;
    this.deleteDialog = false;
    this.educationForm.reset();
  }

  hideDeleteDialog() {
    this.editDialog = false;
    this.deleteDialog = false;
    this.educationForm.reset();
  }

  editRow(row: any) {
    this.editable = true;
    this.deleteEducation = false;
    this.educationForm.patchValue(row);
    this.editDialog = true;
  }

  deleteRow(row: any) {
    this.deleteEducation = true;
    this.editable = false;
    this.educationForm.patchValue(row);
    this.deleteDialog = true;
  }

  saveEducation(): void {
    this.editable = false;
    this.deleteEducation = false;

    let educationDTO = this.educationForm.value as EducationDTO;

    this.api.createUserEducation(this.auth.getId(), educationDTO).subscribe(result => {
      this.editDialog = false;

      this.fetchUserEducations();
      this.educationForm.reset();

      this.messageService.add({
        severity: 'success',
        detail: 'Education updated successfully.',
      });
    }, error => {
      this.editDialog = false;

      this.messageService.add({
        severity: 'error',
        detail: error.error.errorMessage
      });
    })
  }

  updateEducation() {
    let educationDTO = this.educationForm.value as EducationDTO;

    this.api.updateUserEducation(educationDTO.id, educationDTO).subscribe(response => {
        this.editDialog = false;

        this.educationForm.reset();
        this.fetchUserEducations();

        this.messageService.add({
          severity: 'success',
          detail: 'Updated education successfully.'
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

  removeEducation(): void {
    let educationDTO = this.educationForm.value;

    this.api.deleteUserEducation(educationDTO.id).subscribe(response => {
        this.deleteDialog = false;
        this.fetchUserEducations();
        this.educationForm.reset();

        this.messageService.add({
          severity: 'success',
          detail: 'Education deleted successfully.',
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

  get degree(): FormControl {
    return this.educationForm.get('degree') as FormControl;
  }

  get college(): FormControl {
    return this.educationForm.get('college') as FormControl;
  }

  get specialization(): FormControl {
    return this.educationForm.get('specialization') as FormControl;
  }

  get gpa(): FormControl {
    return this.educationForm.get('gpa') as FormControl;
  }

  getEnumByKey(payType: any) {
    return getEnumByKey(payType, DegreeEnum);
  }

  allowOnlyNumberAndDecimal(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;

    return !(charCode > 31 && charCode != 46 && (charCode < 48 || charCode > 57));
  }

}
