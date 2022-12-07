import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ApiService} from "../../../core/shared/services/api.service";
import {AuthService} from "../../../core/shared/services/auth.service";
import {MessageService} from "primeng/api";
import {EducationDTO} from "../../../core/shared/models/dto/education-dto";

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  @Input() educationResponse: EducationDTO[];

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

  // saveBonus(): void {
  //   this.editable = false;
  //   this.deleteBonus = false;
  //
  //   let bonusForm = this.bonusForm.value;
  //   let userId = this.auth.getId();
  //
  //   this.api.createUserBonus(userId, bonusForm).subscribe(result => {
  //     this.editDialog = false;
  //
  //     this.getUserJobInfo();
  //     this.bonusForm.reset();
  //
  //     this.messageService.add({
  //       severity: 'success',
  //       detail: 'Bonus updated successfully.',
  //     });
  //   }, error => {
  //     this.editDialog = false;
  //
  //     this.messageService.add({
  //       severity: 'error',
  //       detail: error.error.errorMessage
  //     });
  //   })
  // }
  //
  // updateBonus() {
  //   let bonusDTO = this.bonusForm.value as BonusDTO;
  //
  //   this.api.updateUserBonus(bonusDTO.id, bonusDTO).subscribe(bonus => {
  //       this.editDialog = false;
  //
  //       this.bonusForm.reset();
  //       this.getUserJobInfo();
  //
  //       this.messageService.add({
  //         severity: 'success',
  //         detail: 'Updated bonus successfully.'
  //       });
  //     },
  //     error => {
  //       this.editDialog = false;
  //
  //       this.messageService.add({
  //         severity: 'error',
  //         detail: error.error.errorMessage
  //       });
  //     })
  // }
  //
  removeEducation(): void {
    //   let bonus = this.bonusForm.value;
    //
    //   this.api.deleteUserBonus(bonus.id).subscribe(bonus => {
    //       this.deleteDialog = false;
    //       this.getUserJobInfo();
    //       this.bonusForm.reset();
    //
    //       this.messageService.add({
    //         severity: 'success',
    //         detail: 'Bonus deleted successfully.',
    //       });
    //     },
    //     error => {
    //       this.deleteDialog = false;
    //
    //       this.messageService.add({
    //         severity: 'error',
    //         detail: error.error.errorMessage
    //       });
    //     })
  }

}
