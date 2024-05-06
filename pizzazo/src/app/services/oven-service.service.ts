import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { OvenDTO } from '../../../models';

@Injectable({
  providedIn: 'root'
})

export class OvenService {

  http = inject(HttpClient);

  getAll() {
    return this.http.get<OvenDTO[]>('/api/oven');    
  }

  getOne(id: number) {
    return this.http.get<OvenDTO>('/api/oven/' + id);    
  }

  create(oven: OvenDTO) {
    return this.http.post<OvenDTO>('/api/oven', oven);
  }

  update(oven: OvenDTO) {
    return this.http.put<OvenDTO>('/api/oven', oven);
  }

  delete(id: number) {
    return this.http.delete('/api/oven/' + id); 
  }
}