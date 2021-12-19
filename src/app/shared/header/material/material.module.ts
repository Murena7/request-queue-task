import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [MatSliderModule, MatIconModule, MatTableModule],
  exports: [MatSliderModule, MatIconModule, MatTableModule],
})
export class MaterialModule {}
