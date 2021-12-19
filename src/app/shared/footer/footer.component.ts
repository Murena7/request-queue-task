import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { UiQuery } from '@core/states/ui/ui.query';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {
  constructor(public uiQuery: UiQuery) {}

  ngOnInit(): void {}
}
