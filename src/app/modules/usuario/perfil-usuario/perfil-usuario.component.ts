import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss'],
  standalone: true,
  imports: [MaterialModule, CommonModule]
})
export class PerfilUsuarioComponent {
  title = 'Agenda+ | Avaliação';

  constructor(
    private titleService: Title,
  ) {
    this.titleService.setTitle(this.title);
  }
}
