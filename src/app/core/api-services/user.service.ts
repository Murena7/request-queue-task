import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  bufferCount,
  concat,
  concatMap,
  from,
  map,
  mergeMap,
  Observable,
  range,
  skip,
  tap,
  timer,
} from 'rxjs';
import { IUser, User } from '../interfaces/user.interface';
import { environment } from '@environment';
import { UiService } from '@core/states/ui/ui.service';

const API_URL = environment.apiUrl;
const REQUESTS_PER_SECOND = 4;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private uiService: UiService) {}

  public getUsers(count: number): Observable<IUser[]> {
    this.uiService.isLoading(true);
    return range(0, count).pipe(
      bufferCount(REQUESTS_PER_SECOND),
      concatMap(valuesArray => {
        return concat<any>(from(valuesArray).pipe(mergeMap(() => this.getUserRequest())), timer(1000).pipe(skip(1)));
      }),
      bufferCount(count),
      tap(() => this.uiService.isLoading(false)),
    );
  }

  private getUserRequest(): Observable<IUser> {
    return this.http.get<IUser>(API_URL).pipe(map(res => Object.assign(new User(), res)));
  }
}
