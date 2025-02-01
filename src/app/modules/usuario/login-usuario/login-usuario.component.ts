import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  standalone: true,
  imports: [MaterialModule, RouterLink, FormsModule, NgIf],
  styleUrls: ['./login-usuario.component.scss']
})
export class LoginUsuarioComponent {
  campoEmail: string = '';
  campoSenha: string = '';

  entrar(email: string, senha: string) {
    console.log(email, senha)
  }
}
