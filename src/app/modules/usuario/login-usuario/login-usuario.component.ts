import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {UsuarioService} from '../usuario.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule, RouterLink],
  styleUrls: ['./login-usuario.component.scss']
})
export class LoginUsuarioComponent {
  title = 'Agenda+ | Entrar';

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private titleService: Title,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.titleService.setTitle(this.title);
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    const {email, senha} = this.loginForm.value;
    if(this.usuarioService.autenticar(email, senha)) {
      this.usuarioService.logarUsuario(email)
      this.snackBar.open('Login realizado com sucesso.', 'Fechar', {
        duration: 3000
      });
      this.router.navigate(['/']).then(r => this.snackBar.open('Login realizado com sucesso.', 'Fechar', {
        duration: 3000
      }));
    } else {
      this.snackBar.open('Email ou senha inválidos, tente novamente.', 'Fechar', {
        duration: 3000
      });
    }
  }

}
