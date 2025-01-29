import { Component } from '@angular/core';
import {MaterialModule} from '../../modules/material/material.module';

@Component({
  selector: 'app-header',
  imports: [
    MaterialModule
  ],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
