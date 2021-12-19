import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '@core/interfaces/user.interface';
import { FormBuilder, FormControl } from '@angular/forms';
import { delay, map, merge, Observable, of, Subject, Subscription, switchMap, takeUntil, tap, timer } from 'rxjs';
import { UserService } from '@core/api-services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from '@pages/home/modals/details/details.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'lastName', 'age'];
  tableData: IUser[] = [];

  sliderControl: FormControl;
  subs: Subscription[] = [];

  repeatEvent = new Subject<number>();
  stopRepeatEvent = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
  ) {
    this.sliderControl = this.fb.control(0);
  }

  ngOnInit(): void {
    this.subs.push(this.initTableData().subscribe(() => {}));
  }

  openDetails(item: IUser): void {
    this.stopRepeatEvent.next(true);

    const dialogRef = this.dialog.open(DetailsComponent, {
      width: '350px',
      data: item,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.repeatEvent.next(this.sliderControl.value);
    });
  }

  initTableData(): Observable<IUser[]> {
    return merge(
      this.repeatEvent.pipe(
        switchMap(sliderValue =>
          timer(10000).pipe(
            takeUntil(this.stopRepeatEvent),
            map(() => sliderValue),
          ),
        ),
      ),
      this.sliderControl.valueChanges,
    ).pipe(
      switchMap(value => {
        this.stopRepeatEvent.next(true);
        this.sliderControl.disable({ emitEvent: false });
        this.tableData = [];
        this.cdr.detectChanges();

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
          this.cdr.detectChanges();
        },
      }),
      delay(1000),
      tap({
        next: value => {
          this.sliderControl.enable({ emitEvent: false });
          this.sliderControl.patchValue(this.sliderControl.value, { emitEvent: false });
          this.cdr.detectChanges();
        },
      }),
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(x => x.unsubscribe());
  }
}
