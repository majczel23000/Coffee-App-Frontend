import { Component, OnInit } from '@angular/core';
import { kitchens } from '../../data/kitchens';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { Order } from '../../data/Order';
import { StatisticsService } from './statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  public kitchens: any[] = kitchens;
  private counters = {
    today: 0,
    week: 0,
    month: 0,
    quarter: 0,
    year: 0
  };
  private drinkers: any[] = [];
  private uniqueDrinkers = {
    today: [],
    week: [],
    month: [],
    quarter: [],
    year: []
  };
  
  private currentDate: string = new Date().toISOString().substring(0, 10);
  orders: Order[];

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit() {
    this.orders = this.statisticsService.getOrdersArray();
    if (this.orders) {
      this.countCoffeesInSingleKitchen();
      this.countCoffees(0, 'today');
      this.countCoffees(7, 'week');
      this.countCoffees(31, 'month');
      this.countCoffees(90, 'quarter');
      this.countCoffees(365, 'year');
    } else {
      this.statisticsService.getOrders().subscribe(orders => {
        this.orders = orders;
        this.countCoffeesInSingleKitchen();
        this.countCoffees(0, 'today');
        this.countCoffees(7, 'week');
        this.countCoffees(31, 'month');
        this.countCoffees(90, 'quarter');
        this.countCoffees(365, 'year');
      });
    }
  }

  countCoffeesInSingleKitchen(): void{
    for (let i = 0; i < this.kitchens.length; i++) {
      this.kitchens[i].count = 0;
      for (let j = 0; j < this.orders.length; j++) {
        if (this.kitchens[i].name === this.orders[j].kitchen) {
          this.kitchens[i].count += 1;
        }
      }
    }
  }

  parseDates(currentDate: string, orderDate: string): number[] {
    let dates: number[] = [];
    dates[0] = Date.parse(currentDate);
    dates[1] = Date.parse(orderDate);
    return dates;
  }

  countCoffees(daysBefore: number, counter: string): void{
    for (let i = 0; i < this.orders.length; i++) {
      const dates = this.parseDates(this.currentDate, this.orders[i].date);
      let before = new Date().setDate(new Date().getDate() - daysBefore);
      let beforeString = new Date(before).toISOString().substring(0, 10);
      if (dates[0] >= dates[1] && dates[1] >= Date.parse(beforeString)) {
        this.counters[counter] += 1;
        this.drinkers.push(this.orders[i].user);
      }
    }
    this.uniqueDrinkers[counter] = this.drinkers.filter( this.collectUniqueDrinkers );
  }

  collectUniqueDrinkers(value, index, self){
    return self.indexOf(value) === index;
  }

}
