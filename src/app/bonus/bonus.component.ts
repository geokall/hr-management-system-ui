import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {ApiService} from "../core/shared/services/api.service";

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.scss']
})
export class BonusComponent implements OnInit {

  @Input() jobForm: FormGroup;

  newBonusDialog: boolean | undefined;
  editable: boolean | undefined;
  deleteBonus: boolean | undefined;

  bonuses: any = null;
  isLoading = false;

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
  }

  openNewBonusDialog() {
    this.editable = false;
    this.deleteBonus = false;
    this.newBonusDialog = true;
  }

  hideOrganizationDialog() {
    this.newBonusDialog = false;
    this.jobForm.reset();
  }

  addBonus() {

  }

  editBonusRow(bonus: any) {

  }

  deleteBonusRow(bonus: any) {

  }

  saveBonus() {

  }

  updateBonus() {

  }

  removeBonus() {

  }
}
