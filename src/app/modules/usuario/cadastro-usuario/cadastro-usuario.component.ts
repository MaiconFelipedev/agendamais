import { Component } from '@angular/core';
import {MaterialModule} from '../../material/material.module';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UsuarioService} from '../usuario.service';
import {Usuario} from '../../../shared/model/usuario';
import {Cliente} from '../../../shared/model/cliente';
import {PrestadorServico} from '../../../shared/model/prestador-servico';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.scss',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule]
})
export class CadastroUsuarioComponent {
  title = 'Agenda+ | Cadastre-se';
  usuarioForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UsuarioService,
    private snackBar: MatSnackBar,
    private titleService: Title,
    private router: Router
  ) {
    this.titleService.setTitle(this.title);

    this.usuarioForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      telefone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
      tipo: ['', Validators.required],
      endereco: this.fb.group({
        rua: ['', Validators.required],
        bairro: ['', Validators.required],
        cidade: ['', Validators.required],
        estado: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]]
      })
    });
  }

  onSubmit(): void {
    if (this.usuarioForm.valid) {
      const { nome, email, senha, telefone, tipo, endereco } = this.usuarioForm.value;

      this.userService.estaCadastrado(email).subscribe(
        resultado => {
          if(resultado){
            this.router.navigate(['/login-usuario']).then(r => this.snackBar.open(`O usuário de email ${email} já está cadastrado.`, "Fechar", {
              duration: 3000
            }));
          } else {
            if (tipo === "cliente"){
              const novoUsuario = new Cliente(nome, email, senha, telefone, tipo, endereco, false);
              this.userService.cadastrarNoBanco(novoUsuario);
            }
            else {
              const novoUsuario = new PrestadorServico(nome, email, senha, telefone, tipo, endereco, false);
              this.userService.cadastrarNoBanco(novoUsuario);
            }
          }
        }
      )
    }
  }

}
