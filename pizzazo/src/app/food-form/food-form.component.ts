import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FoodDTO } from '../../../models';
import { FoodService } from '../services/food-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-food-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './food-form.component.html',
  styleUrl: './food-form.component.css'
})

export class FoodFormComponent implements OnInit{
  formBuilder = inject(FormBuilder);

  foodService = inject(FoodService);

  router = inject(Router);

  activatedRoute = inject(ActivatedRoute);

  foodForm = this.formBuilder.group<FoodDTO>({
    id: 0,
    name: '',
    price: 0,
    size: '',
    description: '',
    making_time: 0,
  });

  isNewFood = true;

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    if(id){
      this.isNewFood = false;
      this.foodService.getOne(id).subscribe({
        next: (food) => this.foodForm.setValue(food),
        error: (err) =>{
          //TODO notification
          console.log(err);
        }
      });
    }
  }

  saveFood(){
    const food = this.foodForm.value as FoodDTO;

    if(this.isNewFood){

      this.foodService.create(food).subscribe({
        next: (foodCreated) => {
          //TODO: notification
          this.router.navigateByUrl('/food');
        },
        error: (err) => {
          //TODO: notification
          console.error(err);
        }
  
      });

    }
    else{

      this.foodService.update(food).subscribe({
        next: (foodCreated) => {
          //TODO: notification
          this.router.navigateByUrl('/food');
        },
        error: (err) => {
          //TODO: notification
          console.error(err);
        }
  
      });
      
    }
  }

  goBack(){
    this.router.navigateByUrl('/food');
  }
}
