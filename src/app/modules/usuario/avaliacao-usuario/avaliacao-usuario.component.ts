import { Component } from '@angular/core';
import {MaterialModule} from '../../material/material.module';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-avaliacao-usuario',
  templateUrl: './avaliacao-usuario.component.html',
  styleUrl: './avaliacao-usuario.component.scss',
  standalone: true,
  imports: [MaterialModule, CommonModule]

})
export class AvaliacaoUsuarioComponent {

}
