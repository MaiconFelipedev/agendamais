import { Component } from '@angular/core';
import {MaterialModule} from '../../material/material.module';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-card-servico',
  templateUrl: './card-servico.component.html',
  styleUrl: './card-servico.component.scss',
  standalone: true,
  imports: [MaterialModule, CommonModule]
})
export class CardServicoComponent {

}
