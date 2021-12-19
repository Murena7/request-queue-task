import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import {ReactiveFormsModule} from '@angular/forms';

const MATERIAL_MODULES = [MatSliderModule, MatTableModule];

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, ...MATERIAL_MODULES, ReactiveFormsModule],
})
export class HomeModule {}
