import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { OrderDTO, UserDTO, FoodDTO, OvenDTO } from '../../../models';
import { OrderService } from '../services/order-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user-service.service';
import { FoodService } from '../services/food-service.service';
import { OvenService } from '../services/oven-service.service';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})

export class OrderFormComponent implements OnInit{

  formBuilder = inject(FormBuilder);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  userService = inject(UserService);
  orderService = inject(OrderService);
  foodService = inject(FoodService);
  ovenService = inject(OvenService);

  users: UserDTO[] = [];
  foods: FoodDTO[] = [];
  orders: OrderDTO[] = [];
  ovens: OvenDTO[] = [];

  orderForm = this.formBuilder.group<OrderDTO>({
    id: 0,
    timestamp: '',
    price: 0,
    source: null,
    orderedfood: null,
    deliveryTime: 0,
    status: 'süt'
  });

  isNewOrder = true;
  shippingTime = 20; // a szállítási idő

  ngOnInit(): void {
    this.userService.getAll().subscribe(users => this.users = users);
    this.foodService.getAll().subscribe(foods => this.foods = foods);
    this.ovenService.getAll().subscribe(ovens => this.ovens = ovens);
    this.orderService.getAll().subscribe({
      next: (orders) => {
        this.orders = orders;
      },
      error: (err) => console.error(err)
    });
  }


  CalculatePrice(){
    const order = this.orderForm.value as OrderDTO;
    const priceControl = this.orderForm.get('price');
    const discountValue = +(document.getElementById('discount') as HTMLInputElement).value; // %-os leárazás mértéke
    const amountValue = +(document.getElementById('amount') as HTMLInputElement).value; // az érték ami felett életbe lép a leárazás

        // Ellenőrzés,hogy kedvezmény csak a konfigurált érték után járjon
        if(amountValue <= order.price){
          // Ha a price mező létezik és nem null vagy undefined, lekérjük az értékét
          if (priceControl && priceControl.value !== null && priceControl.value !== undefined) {
            let priceValue = priceControl.value;
            // a kedvezmény értékének kiszámolása
            priceValue *= (1 - (discountValue/100)); 
            // Frissítsük az order price mezőjét
            order.price = priceValue;
          } else {
            console.error('Price field does not exist or has a null or undefined value in the form group.');
          }
        }
  }


  CalculateTime(){
    const order = this.orderForm.value as OrderDTO;
    const deliver = this.orderForm.get('deliveryTime');
    const bakingtimeValue = +(document.getElementById('bakingTime') as HTMLInputElement).value;

     // szállítási idő kiszámolása
     if(deliver && deliver.value !== null && deliver.value !== undefined){
      let deliverTime = deliver.value;
      deliverTime = deliverTime + this.shippingTime + bakingtimeValue;
      order.deliveryTime = deliverTime;
    } else {
      console.error('deliveryTime field does not exist or has a null or undefined value in the form group.');
    }
  }

  saveOrder() {
    const order = this.orderForm.value as OrderDTO;
  
    this.CalculatePrice();
    this.CalculateTime();

    if(this.isNewOrder){
      this.orderService.create(order).subscribe({
        next: (orderCreated) => {
          //TODO: notification
          this.router.navigateByUrl('/order');
        },
        error: (err) => {
          //TODO: notification
          console.error(err);
        }
      });
    }
    
  }

  goBack(){
    this.router.navigateByUrl('/order');
  }


}