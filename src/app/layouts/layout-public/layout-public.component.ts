import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-layout-public',
  templateUrl: './layout-public.component.html',
  styleUrls: ['./layout-public.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutPublicComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
