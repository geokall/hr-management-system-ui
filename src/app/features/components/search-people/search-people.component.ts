import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../core/shared/services/api.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-search-people',
  templateUrl: './search-people.component.html',
  styleUrls: ['./search-people.component.scss']
})
export class SearchPeopleComponent implements OnInit {

  peopleForm: any;
  newDialog: boolean | undefined;
  peopleResponse: any;
  person: any;
  editable: boolean | undefined;

  deletePerson: boolean | undefined;

  //@ts-ignore
  formErrors: Message[];
  isLoading = true;

  divisionsMultiSelect: any[];
  locationsMultiSelect: any[];

  constructor(private api: ApiService,
              private router: Router,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getAllUsers();
    this.fetchDivisions();
    this.fetchLocations();
  }

  initForm(): void {
    this.peopleForm = new FormGroup({
      id: new FormControl(null),
      username: new FormControl(null),
      name: new FormControl(null),
      surname: new FormControl(null),
      workNumber: new FormControl(null),
      businessEmail: new FormControl(null),
      linkedinUrl: new FormControl(null),
      division: new FormControl(null),
      location: new FormControl(null)
    });
  }

  fetchDivisions() {
    this.api.fetchDivisions().subscribe(response => {
      this.divisionsMultiSelect = response;
      console.log(this.divisionsMultiSelect)
    }, error => {
      this.messageService.add({
        severity: 'error',
        detail: error.error.errorMessage
      });
    })
  }

  fetchLocations() {
    this.api.fetchLocations().subscribe(response => {
      this.locationsMultiSelect = response;
    }, error => {
      this.messageService.add({
        severity: 'error',
        detail: error.error.errorMessage
      });
    })
  }

  getAllUsers() {
    this.api.getAllUsers().subscribe(response => {
        this.peopleResponse = response;
        this.isLoading = false;
      },
      error => {
        this.messageService.add({
          severity: 'error',
          detail: error.error.errorMessage
        });
      });
  }

  editStudent(student: any) {

  }

  hideStudentDialog() {
    this.newDialog = false;
    this.peopleForm.reset();
  }

  updateStudent() {

  }
}
