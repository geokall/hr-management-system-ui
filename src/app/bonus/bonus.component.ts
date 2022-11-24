import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ApiService} from "../core/shared/services/api.service";
import {BonusDTO} from "../core/shared/models/dto/bonus-dto";
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

  @Input() jobForm: FormGroup;

  bonusForm: FormGroup;

  newBonusDialog: boolean | undefined;
  editable: boolean | undefined = false;
  deleteBonus: boolean | undefined = false;

  bonus: BonusDTO[] = [];
  isLoading: boolean = false;

  constructor(private fb: FormBuilder,
              private api: ApiService,
              private auth: AuthService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
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
