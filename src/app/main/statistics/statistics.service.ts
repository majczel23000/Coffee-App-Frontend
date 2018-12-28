import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { Order } from '../../data/Order';
import { Observable } from '../../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  ordersCollection: AngularFirestoreCollection<Order>;
  orders: Observable<Order[]>;
  ordersArray: any;

  constructor(public afs: AngularFirestore) {
    this.orders = this.afs.collection('orders').valueChanges();
    this.setOrdersArray();
  }

  getOrders(){
    return this.orders;
  }

  setOrdersArray(){
    this.orders.subscribe(orders => {
      this.ordersArray = orders;
    });
  }

  getOrdersArray(){
    return this.ordersArray;
  }
}
