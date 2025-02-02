import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatAutocompleteModule
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatAutocompleteModule
  ]
})
export class MaterialModule { }
