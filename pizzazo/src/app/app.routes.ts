import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { FoodListComponent } from './food-list/food-list.component';
import { FoodFormComponent } from './food-form/food-form.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { OvenComponent } from './oven/oven.component';

export const routes: Routes = [
    {
        path: '',
        component: UserListComponent
    },
    {
        path: 'add-user',
        component: UserFormComponent
    },
    {
        path: 'edit-user/:id',
        component: UserFormComponent
    },
    {
        path: 'food',
        component: FoodListComponent
    },
    {
        path: 'add-food',
        component: FoodFormComponent
    },
    {
        path: 'edit-food/:id',
        component: FoodFormComponent
    },
    {
        path: 'order',
        component: OrderListComponent
    },
    {
        path: 'add-order',
        component: OrderFormComponent
    },
    {
        path: 'oven',
        component: OvenComponent
    },

];
