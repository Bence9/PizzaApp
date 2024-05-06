import { Component, OnInit, SimpleChanges, inject } from '@angular/core';
import { OvenService } from '../services/oven-service.service';
import { OrderDTO, OvenDTO } from '../../../models';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../services/order-service.service';

@Component({
  selector: 'app-oven',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './oven.component.html',
  styleUrl: './oven.component.css'
})

export class OvenComponent implements OnInit{
  ovenService = inject(OvenService);
  orderService = inject(OrderService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);

  ovens: OvenDTO[] = [];
  orders: OrderDTO[] = [];

  orderNumber = 0;

  ovenForm = this.formBuilder.group<OvenDTO>({
    id: 0,
    time: 20,
    status: ''
  });

  ngOnInit(): void {
    setInterval(() => this.updateOvens(), 60000); // 1000 ms = 1 mp

    this.orderService.getAll().subscribe({
        next: (orders) => {
            this.orders = orders;
            this.orderNumber = this.orders.length;
            this.OvenWatcher();
        },
        error: (err) => console.error(err)
    });

    this.ovenService.getAll().subscribe({
        next: (ovens) => this.ovens = ovens,
        error: (err) => console.error(err)
    });
}

// szabad sütő figyelő
OvenWatcher() {
  // van-e aktív rendelés
  if (this.orderNumber > 0) {
      // van-e szabad sütő
      const freeOven = this.ovens.find(oven => oven.status !== 'süt');
      if (freeOven) {
          // Ha van szabad sütőnk, akkor elindítjuk
          this.startOven(freeOven);
      } else {
          console.log('Nincs szabad sütő.');
      }
  } else {
      console.log('Nincs új rendelés.');
      console.log("Ordercount " + this.orderNumber);
  }
}


updateOvens(): void {
    this.ovens.forEach(oven => this.numDecrement(oven));
}

numDecrement(oven: OvenDTO): void {
    if (oven.status === 'süt') {
        oven.time--;
    }
    if (oven.time <= 0) {
      oven.time = 0;
    }
    this.TimeChangeListener();
}

  TimeChangeListener() {
    this.ovens.forEach(oven => {
        if (oven.time < 20) {
            this.updateOven(oven);
        }
    });
}

// a sütő aktuális értékeinek mentése
updateOven(oven: OvenDTO) {
  this.ovenService.update(oven).subscribe({
      next: (ovenUpdated) => {
          //TODO: notification
          console.log('Sütő frissítve: ', ovenUpdated);
      },
      error: (err) => {
          //TODO: notification
          console.error(err);
      }
  });
}

// Sütő visszaállítása
backOven(oven: OvenDTO){
  oven.time = 20;
  oven.status = 'nem süt';
  this.updateOven(oven);
}

// sütő elindítása
startOven(oven: OvenDTO){
  oven.time = 20;
  oven.status = 'süt';
  this.updateOven(oven);
}


  deleteOven(oven: OvenDTO){
    this.ovenService.delete(oven.id).subscribe({
      next: () => {
        const index = this.ovens.indexOf(oven);
        if(index > -1){
          this.ovens.splice(index, 1);
        }
      },
      error: (err) => {
        //TODO notification
        console.error(err);
      }
    })
  }


}