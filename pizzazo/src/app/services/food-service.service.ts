import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { FoodDTO } from '../../../models';

@Injectable({
  providedIn: 'root'
})

export class FoodService {

  http = inject(HttpClient);

  getAll() {
    return this.http.get<FoodDTO[]>('/api/food');    
  }

  getOne(id: number) {
    return this.http.get<FoodDTO>('/api/food/' + id);    
  }

  create(food: FoodDTO) {
    return this.http.post<FoodDTO>('/api/food', food);
  }

  update(food: FoodDTO) {
    return this.http.put<FoodDTO>('/api/food', food);
  }

  delete(id: number) {
    return this.http.delete('/api/food/' + id); 
  }
}
