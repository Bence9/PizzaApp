import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { OrderDTO } from '../../../models';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  http = inject(HttpClient);

  getAll() {
    return this.http.get<OrderDTO[]>('/api/order');    
  }

  getOne(id: number) {
    return this.http.get<OrderDTO>('/api/order/' + id);    
  }

  create(order: OrderDTO) {
    return this.http.post<OrderDTO>('/api/order', order);
  }

  delete(id: number) {
    return this.http.delete('/api/order/' + id); 
  }

  update(order: OrderDTO) {
    return this.http.put<OrderDTO>('/api/order', order);
  }

  OrdersofUser(userId: number){
    return this.http.get<OrderDTO[]>('/api/order/created-by/' + userId);
  }


}
