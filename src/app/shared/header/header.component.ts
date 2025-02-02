import { Component } from '@angular/core';
import {MaterialModule} from '../../modules/material/material.module';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    MaterialModule,
    RouterLink
  ],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
