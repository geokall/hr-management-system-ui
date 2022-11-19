import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  @Input() activeItem: MenuItem;
  @Input() menuItems: MenuItem[];

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.menuItems);
    // this.activeItem = this.menuItems[1];

  }

}
