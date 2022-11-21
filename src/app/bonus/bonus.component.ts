import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {ApiService} from "../core/shared/services/api.service";

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.scss']
})
export class BonusComponent implements OnInit {

  @Input() jobForm: FormGroup;

  newBonusDialog: boolean | undefined;
  editable: boolean | undefined = false;
  deleteBonus: boolean | undefined = false;

  bonus: any = null;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder,
              private api: ApiService) {
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

  get jobInformation(): FormGroup {
    return this.jobForm.get('jobInformation') as FormGroup;
  }

  get bonuses(): FormArray {
    return this.jobInformation.get('bonuses') as FormArray;
  }
}
