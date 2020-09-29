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

  getUserDetail(id: number): Observable<UserPage> {
    return this.httpClient.get<UserPage>(`${environment.apiUrl}/api/users/${id}`);
  }

  addUser(user: User): Observable<number> {
    const id = Math.floor(100000 + Math.random() * 900000);
    return this.httpClient
      .post<User>(`${environment.apiUrl}/books`, {
        ...user,
        id
      })
      .pipe(map(() => id));
  }
}
