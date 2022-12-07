import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ApiService} from "../../../core/shared/services/api.service";
import {environment} from "../../../../environments/environment";
import {AuthService} from "../../../core/shared/services/auth.service";
import {MessageService} from "primeng/api";
import {BonusDTO} from "../../../core/shared/models/dto/bonus-dto";

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.scss']
})
export class BonusComponent implements OnInit {

  @Input() bonusResponse: BonusDTO[];

  env = environment;

  bonusForm: FormGroup;

  editDialog: boolean | undefined;
  deleteDialog: boolean | undefined;
  editable: boolean | undefined = false;
  deleteBonus: boolean | undefined = false;

  bonuses: any;
  bonusButtonHeader: string = 'Add bonus';
  bonusHeader: string = 'Bonus';
  isLoading: boolean = false;

  constructor(private fb: FormBuilder,
              private api: ApiService,
              private auth: AuthService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.setBonusResponseByParent();
  }

  initForm() {
    this.bonusForm = new FormGroup({
      id: new FormControl(null),
      bonusDate: new FormControl(null),
      amount: new FormControl(null),
      comment: new FormControl(null)
    })
  }

  setBonusResponseByParent() {
    this.bonuses = this.bonusResponse;
  }

  openNewBonusDialog() {
    this.editable = false;
    this.deleteBonus = false;
    this.editDialog = true;
  }

  hideDialog() {
    this.editDialog = false;
    this.deleteDialog = false;
    this.bonusForm.reset();
  }

  hideDeleteDialog() {
    this.editDialog = false;
    this.deleteDialog = false;
    this.bonusForm.reset();
  }

  editRow(row: any) {
    this.editable = true;
    this.deleteBonus = false;
    this.bonusForm.patchValue(row);
    this.editDialog = true;
  }

  deleteRow(row: any) {
    this.deleteBonus = true;
    this.editable = false;
    this.bonusForm.patchValue(row);
    this.deleteDialog = true;
  }

  getUserBonuses(): void {
    this.api.fetchUserBonus(this.auth.getId()).subscribe(result => {
      this.bonuses = result;
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

      this.getUserBonuses();
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
        this.getUserBonuses();

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
        this.getUserBonuses();
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
}
