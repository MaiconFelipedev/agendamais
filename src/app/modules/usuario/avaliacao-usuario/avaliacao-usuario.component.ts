import { Component } from '@angular/core';
import {MaterialModule} from '../../material/material.module';
import {CommonModule} from '@angular/common';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-avaliacao-usuario',
  templateUrl: './avaliacao-usuario.component.html',
  styleUrl: './avaliacao-usuario.component.scss',
  standalone: true,
  imports: [MaterialModule, CommonModule]

})
export class AvaliacaoUsuarioComponent {
  title = 'Agenda+ | Avaliação';

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title);
  }
}
