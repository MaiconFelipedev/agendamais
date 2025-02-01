import { Component } from '@angular/core';
import {MaterialModule} from '../../material/material.module';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-cadastro-servico',
  templateUrl: './cadastro-servico.component.html',
  styleUrl: './cadastro-servico.component.scss',
  standalone: true,
  imports: [MaterialModule, CommonModule]
})
export class CadastroServicoComponent {

}
