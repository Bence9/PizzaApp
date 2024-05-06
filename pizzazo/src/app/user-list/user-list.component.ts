import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../services/user-service.service';
import { UserDTO } from '../../../models';
import { Router } from '@angular/router';
import { OrderService } from '../services/order-service.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})

export class UserListComponent implements OnInit {
  userService = inject(UserService);

  orderservice = inject(OrderService);

  users: UserDTO[] = [];

  router = inject(Router);

  ngOnInit(): void {
    this.userService.getAll().subscribe({
      next: (users) => this.users = users,
      error: (err) => console.error(err)
    });
  }

  goToUserForm(id: number){
    this.router.navigate([ 'edit-user', id]);
  }

  deleteUser(user: UserDTO){
    this.userService.delete(user.id).subscribe({
      next: () => {
        const index = this.users.indexOf(user);
        if(index > -1){
          this.users.splice(index, 1);
        }
      },
      error: (err) => {
        //TODO notification
        console.error(err);
      }
    })
  }

  loadOrdersOfUser(id: number){
    this.orderservice.OrdersofUser(id).subscribe(orders => console.log(orders));
  }

}
