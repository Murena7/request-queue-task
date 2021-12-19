import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '@core/interfaces/user.interface';
import { FormBuilder, FormControl } from '@angular/forms';
import { delay, interval, map, merge, of, race, Subject, Subscription, switchMap, takeUntil, tap, timer } from 'rxjs';
import { UserService } from '@core/api-services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'lastName', 'age'];
  tableData: IUser[] = [];

  sliderControl: FormControl;
  subs: Subscription[] = [];

  repeatEvent = new Subject<number>();
  stopRepeatEvent = new Subject<boolean>();

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.sliderControl = this.fb.control(0);
  }

  ngOnInit(): void {
    this.subs.push(
      merge(
        this.repeatEvent.pipe(
          switchMap(sliderValue =>
            timer(10000).pipe(
              takeUntil(this.stopRepeatEvent),
              map(() => sliderValue),
            ),
          ),
        ),
        this.sliderControl.valueChanges,
      )
        .pipe(
          switchMap(value => {
            this.stopRepeatEvent.next(true);
            this.sliderControl.disable({ emitEvent: false });
            this.tableData = [];

            if (value === 0) {
              this.sliderControl.enable({ emitEvent: false });
              return of([]);
            }

            return this.userService.getUsers(value);
          }),
          tap({
            next: value => {
              this.tableData = value;
              this.repeatEvent.next(this.sliderControl.value);
            },
          }),
          delay(1000),
        )
        .subscribe(x => {
          this.sliderControl.enable({ emitEvent: false });
        }),
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(x => x.unsubscribe());
  }
}
