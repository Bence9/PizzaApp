import { Component, OnInit, inject } from '@angular/core';
import {  OrderDTO } from '../../../models';
import { Router } from '@angular/router';
import { OrderService } from '../services/order-service.service';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})

export class OrderListComponent implements OnInit{

  orderService = inject(OrderService);
  
  orders: OrderDTO[] = [];

  router = inject(Router);

  ngOnInit(): void {
    this.orderService.getAll().subscribe({
      next: (orders) => this.orders = orders,
      error: (err) => console.error(err)
    });
  }

  deleteOrder(order: OrderDTO){
    this.orderService.delete(order.id).subscribe({
      
      next: () => {
        const index = this.orders.indexOf(order);
        if(index > -1){
          this.orders.splice(index, 1);
        }
      },
      error: (err) => {
        //TODO notification
        console.error(err);
      }
    })
  }


}
