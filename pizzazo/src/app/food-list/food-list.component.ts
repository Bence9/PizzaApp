import { Component, OnInit, inject } from '@angular/core';
import { FoodService } from '../services/food-service.service';
import { FoodDTO } from '../../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food-list',
  standalone: true,
  imports: [],
  templateUrl: './food-list.component.html',
  styleUrl: './food-list.component.css'
})
export class FoodListComponent implements OnInit {
  foodService = inject(FoodService);

  foods: FoodDTO[] = [];

  router = inject(Router);

  ngOnInit(): void {
    this.foodService.getAll().subscribe({
      next: (foods) => this.foods = foods,
      error: (err) => console.error(err)
    });
  }

  goToFoodForm(id: number){
    this.router.navigate([ 'edit-food', id]);
  }

  deleteFood(food: FoodDTO){
    this.foodService.delete(food.id).subscribe({
      next: () => {
        const index = this.foods.indexOf(food);
        if(index > -1){
          this.foods.splice(index, 1);
        }
      },
      error: (err) => {
        //TODO notification
        console.error(err);
      }
    })
  }
  
}
