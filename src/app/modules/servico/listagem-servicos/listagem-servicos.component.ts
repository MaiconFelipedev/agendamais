import { Component } from '@angular/core';
import {MaterialModule} from '../../material/material.module';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-listagem-servicos',
  templateUrl: './listagem-servicos.component.html',
  styleUrl: './listagem-servicos.component.scss',
  standalone: true,
  imports: [MaterialModule, CommonModule]
})
export class ListagemServicosComponent {

}
