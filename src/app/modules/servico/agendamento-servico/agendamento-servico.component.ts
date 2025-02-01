import { Component } from '@angular/core';
import {MaterialModule} from '../../material/material.module';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-agendamento-servico',
  templateUrl: './agendamento-servico.component.html',
  styleUrl: './agendamento-servico.component.scss',
  standalone: true,
  imports: [MaterialModule, CommonModule]
})
export class AgendamentoServicoComponent {

}
