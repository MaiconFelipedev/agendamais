import { Component } from '@angular/core';
import {MaterialModule} from '../../material/material.module';
import {CommonModule} from '@angular/common';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-cadastro-servico',
  templateUrl: './cadastro-servico.component.html',
  styleUrl: './cadastro-servico.component.scss',
  standalone: true,
  imports: [MaterialModule, CommonModule]
})
export class CadastroServicoComponent {
  title = 'Agenda+ | Novo serviço';
  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title);
  }
}
