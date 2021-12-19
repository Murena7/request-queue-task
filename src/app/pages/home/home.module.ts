import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './modals/details/details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

const MATERIAL_MODULES = [MatSliderModule, MatTableModule, MatDialogModule, MatIconModule, MatButtonModule];

@NgModule({
  declarations: [HomeComponent, DetailsComponent],
  imports: [CommonModule, HomeRoutingModule, ...MATERIAL_MODULES, ReactiveFormsModule],
})
export class HomeModule {}
