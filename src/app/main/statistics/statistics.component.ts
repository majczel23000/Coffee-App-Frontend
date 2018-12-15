import { Component, OnInit } from '@angular/core';
import { kitchens } from '../../data/kitchens';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  private kitchens: any[] = kitchens;

  constructor() { }

  ngOnInit() {
  }

}
