import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ApiService} from "../core/shared/services/api.service";
import {environment} from "../../environments/environment";
import {AuthService} from "../core/shared/services/auth.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.scss']
})
export class BonusComponent implements OnInit {

  env = environment;

  bonusForm: FormGroup;

  newBonusDialog: boolean | undefined;
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
    this.newBonusDialog = true;
  }

  hideOrganizationDialog() {
    this.newBonusDialog = false;
    this.bonusForm.reset();
  }

  addBonus() {

  }

  editBonusRow(bonus: any) {

  }

  deleteBonusRow(bonus: any) {

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
    this.api.updateUserBonus(userId, bonusForm).subscribe(result => {

      this.messageService.add({
        severity: 'success',
        detail: 'Bonus has been updated successfully.',
      });
    }, error => {

    })
  }

  updateBonus() {

  }

  removeBonus() {

  }

  get amount(): FormControl {
    return this.bonusForm.get('amount') as FormControl;
  }

  get comment(): FormControl {
    return this.bonusForm.get('comment') as FormControl;
  }
}
