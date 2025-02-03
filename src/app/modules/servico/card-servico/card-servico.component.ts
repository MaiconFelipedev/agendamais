import { Component, Input } from '@angular/core';
import {MaterialModule} from '../../material/material.module';
import {CommonModule} from '@angular/common';
import {Servico} from '../../../shared/model/servico';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-card-servico',
  templateUrl: './card-servico.component.html',
  styleUrl: './card-servico.component.scss',
  standalone: true,
  imports: [MaterialModule, CommonModule]
})
export class CardServicoComponent {
  @Input() servico!: Servico;

  title = 'Agenda+ | Serviço';
  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title);
  }
}
