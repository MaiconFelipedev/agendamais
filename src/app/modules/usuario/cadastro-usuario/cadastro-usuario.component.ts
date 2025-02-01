import { Component } from '@angular/core';
import {MaterialModule} from '../../material/material.module';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.scss',
  standalone: true,
  imports: [MaterialModule, CommonModule]
})
export class CadastroUsuarioComponent {

}
