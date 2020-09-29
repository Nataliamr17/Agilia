import { Component, OnInit } from '@angular/core';
import { UserPage } from 'src/app/shared/models/users.model';

import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  state = 'loading';
  users: UserPage;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(event?) {
    this.state = 'loading';
    this.usersService.getUsers().subscribe(
      (users: UserPage) => {
        (this.users = users);
        this.state = 'loaded';
        event?.target?.complete();
      },
      (error) => {
        this.state = 'error';
        console.log(error);
      }
    );
  }

  public removeUser(index: number): void {
    this.users.data.splice(index, 1);
  }

  public createUser(){

  }

}
