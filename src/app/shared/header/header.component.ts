import { Component } from '@angular/core';
import {MaterialModule} from '../../modules/material/material.module';
import {RouterLink} from '@angular/router';
import {UsuarioService} from '../../modules/usuario/usuario.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    MaterialModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
constructor(
    protected usuarioService: UsuarioService
  ) {}
}
