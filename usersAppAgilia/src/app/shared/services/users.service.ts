import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserPage } from '../models/users.model';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }


  getUsers(): Observable<UserPage> {
    return this.httpClient.get<UserPage>(`${environment.apiUrl}/api/users?page=2`);
  }

  getUserDetail(id: number): Observable<User> {
    return this.httpClient.get<User>(`${environment.apiUrl}/api/users/${id}`);
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.patch<User>(`${environment.apiUrl}/api/users/${user.id}`, user);
  }

  addUser(user: User): Observable<number> {
    const id = Math.floor(100000 + Math.random() * 900000);
    return this.httpClient
      .post<User>(`${environment.apiUrl}/api/users?page=2`, {
        ...user,
        id
      })
      .pipe(map(() => id));
  }
}
