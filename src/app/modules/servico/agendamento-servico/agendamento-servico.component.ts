import { Component } from '@angular/core';
import {MaterialModule} from '../../material/material.module';
import {CommonModule} from '@angular/common';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-agendamento-servico',
  templateUrl: './agendamento-servico.component.html',
  styleUrl: './agendamento-servico.component.scss',
  standalone: true,
  imports: [MaterialModule, CommonModule]
})
export class AgendamentoServicoComponent {
  title = 'Agenda+ | Novo agendamento';

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title);
  }
}
