import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ApiService} from "../core/shared/services/api.service";
import {environment} from "../../environments/environment";
import {AuthService} from "../core/shared/services/auth.service";
import {MessageService} from "primeng/api";
import {BonusDTO} from "../core/shared/models/dto/bonus-dto";

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.scss']
})
export class BonusComponent implements OnInit {

  env = environment;

  bonusForm: FormGroup;

  editDialog: boolean | undefined;
  deleteDialog: boolean | undefined;
  editable: boolean | undefined = false;
  deleteBonus: boolean | undefined = false;

  bonuses: any;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder,
              private api: ApiService,
              private auth: AuthService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getUserJobInfo();
  }

  initForm() {
    this.bonusForm = new FormGroup({
      id: new FormControl(null),
      bonusDate: new FormControl(null),
      amount: new FormControl(null),
      comment: new FormControl(null)
    })
  }

  openNewBonusDialog() {
    this.editable = false;
    this.deleteBonus = false;
    this.editDialog = true;
  }

  hideOrganizationDialog() {
    this.editDialog = false;
    this.bonusForm.reset();
  }

  hideDeleteDialog() {
    this.editDialog = false;
    this.deleteDialog = false;
    this.bonusForm.reset();
  }

  addBonus() {

  }

  editBonusRow(bonus: any) {
    this.editable = true;
    this.deleteBonus = false;
    // this.bonusForm.get('organizationType').disable()
    this.bonusForm.patchValue(bonus);
    this.editDialog = true;
  }

  deleteBonusRow(bonus: any) {
    this.deleteBonus = true;
    this.editable = false;
    this.bonusForm.patchValue(bonus);
    this.deleteDialog = true;
  }

  getUserJobInfo(): void {
    this.api.fetchUserJobInfo(this.auth.getId()).subscribe(result => {
      this.bonuses = result.bonuses;
      this.isLoading = false;
    }, error => {
      this.messageService.add({
        severity: 'error',
        detail: error.error.errorMessage
      });
    })
  }

  saveBonus(): void {
    this.editable = false;
    this.deleteBonus = false;

    let bonusForm = this.bonusForm.value;
    let userId = this.auth.getId();

    this.api.createUserBonus(userId, bonusForm).subscribe(result => {
      this.editDialog = false;

      this.getUserJobInfo();
      this.bonusForm.reset();

      this.messageService.add({
        severity: 'success',
        detail: 'Bonus updated successfully.',
      });
    }, error => {
      this.editDialog = false;

      this.messageService.add({
        severity: 'error',
        detail: error.error.errorMessage
      });
    })
  }

  updateBonus() {
    let bonusDTO = this.bonusForm.value as BonusDTO;

    this.api.updateUserBonus(bonusDTO.id, bonusDTO).subscribe(bonus => {
        this.editDialog = false;

        this.bonusForm.reset();
        this.getUserJobInfo();

        this.messageService.add({
          severity: 'success',
          detail: 'Updated bonus successfully.'
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

  removeBonus(): void {
    let bonus = this.bonusForm.value;

    this.api.deleteUserBonus(bonus.id).subscribe(bonus => {
        this.deleteDialog = false;
        this.getUserJobInfo();
        this.bonusForm.reset();

        this.messageService.add({
          severity: 'success',
          detail: 'Bonus deleted successfully.',
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

  get amount(): FormControl {
    return this.bonusForm.get('amount') as FormControl;
  }

  get comment(): FormControl {
    return this.bonusForm.get('comment') as FormControl;
  }
}
