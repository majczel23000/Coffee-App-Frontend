import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainRoutingModule } from './main-routing.module';
import { OrderComponent } from './order/order.component';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule
  ],
  declarations: [OrderComponent, StatisticsComponent]
})
export class MainModule { }
