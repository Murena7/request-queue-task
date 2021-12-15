import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutPublicRoutingModule } from './layout-public-routing.module';
import { LayoutPublicComponent } from './layout-public.component';
import { HeaderModule } from '@shared/header/header.module';
import { FooterModule } from '@shared/footer/footer.module';

@NgModule({
  declarations: [LayoutPublicComponent],
  imports: [CommonModule, LayoutPublicRoutingModule, HeaderModule, FooterModule],
})
export class LayoutPublicModule {}
