import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  bufferCount,
  concat,
  concatMap,
  delay,
  EMPTY,
  empty,
  filter,
  from,
  map,
  mergeMap,
  Observable,
  of,
  range,
  skip,
  tap,
  timer,
} from 'rxjs';
import { IUser, User } from '../interfaces/user.interface';
import { environment } from '@environment';

const API_URL = environment.apiUrl;
const REQUESTS_PER_SECOND = 4;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public getUsers(count: number): Observable<IUser[]> {
    return range(0, count).pipe(
      bufferCount(REQUESTS_PER_SECOND),
      concatMap(valuesArray => {
        return concat<any>(from(valuesArray).pipe(mergeMap(() => this.getUserRequest())), timer(1000).pipe(skip(1)));
      }),
      bufferCount(count),
    );
  }

  private getUserRequest(): Observable<IUser> {
    return this.http.get<IUser>(API_URL).pipe(map(res => Object.assign(new User(), res)));
  }
}
