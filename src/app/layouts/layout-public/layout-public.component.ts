import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-layout-public',
  templateUrl: './layout-public.component.html',
  styleUrls: ['./layout-public.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutPublicComponent {
  constructor() {}
}
