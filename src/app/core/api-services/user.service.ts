import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IUser, User } from '../interfaces/user.interface';
import { environment } from '@environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public getUser(): Observable<IUser> {
    return this.http.get<IUser>(API_URL).pipe(map(res => Object.assign(new User(), res)));
  }
}
