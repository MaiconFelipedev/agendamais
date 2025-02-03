import { Component } from '@angular/core';
import {MaterialModule} from '../../material/material.module';
import {CommonModule} from '@angular/common';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-agenda-prestador',
  templateUrl: './agenda-prestador.component.html',
  styleUrl: './agenda-prestador.component.scss',
  standalone: true,
  imports: [MaterialModule, CommonModule]
})
export class AgendaPrestadorComponent {
  title = 'Agenda+ | Minha agenda';

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title);
  }
}
