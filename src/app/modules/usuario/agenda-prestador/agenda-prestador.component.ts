import { Component } from '@angular/core';
import {MaterialModule} from '../../material/material.module';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-agenda-prestador',
  templateUrl: './agenda-prestador.component.html',
  styleUrl: './agenda-prestador.component.scss',
  standalone: true,
  imports: [MaterialModule, CommonModule]
})
export class AgendaPrestadorComponent {

}
