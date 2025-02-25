import { Injectable } from '@angular/core';
import { Usuario } from '../../shared/model/usuario';
import {PrestadorServico} from '../../shared/model/prestador-servico';
import {Cliente} from '../../shared/model/cliente';
import {UsuarioFirestoreService} from './usuario-firestore.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarioAtual: Usuario | undefined;

  constructor(
    private usuarioFirestore: UsuarioFirestoreService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }


  estaCadastrado(email: string): Observable<boolean> {
    return this.usuarioFirestore.estaCadastrado(email).pipe(
      map(resultado => resultado != null)
    );
  }

  cadastrarNoBanco(usuario: Usuario) {
    this.usuarioFirestore.cadastrar(usuario).subscribe({
      next: (resultado) => {
        if (resultado instanceof Usuario) {
          // Armazena o usuário na sessão
          sessionStorage.setItem('usuarioLogado', JSON.stringify(resultado));
          this.usuarioAtual = resultado;

          // Redireciona o usuário após o cadastro
          if (resultado.tipo === 'profissional') {
            this.router.navigate(['/agenda-prestador']);
          } else {
            this.router.navigate(['/listagem-servicos']);
          }

          this.snackBar.open(`Bem-vindo, ${resultado.nome}!`, 'Fechar', {
            duration: 3000
          });
        }
      },
      error: () => {
        this.snackBar.open('Erro ao cadastrar usuário. Tente novamente.', 'Fechar', {
          duration: 3000
        });
      }
    });
  }


  autenticar(email: string, senha: string): Observable<boolean> {
    return this.usuarioFirestore.autenticar(email, senha).pipe(
      map(usuario => {
        if (usuario) {
          sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario)); // Armazena o usuário na sessão
          this.usuarioAtual = usuario;
          return true;
        }
        return false;
      })
    );
  }

  logarUsuario(email: string): void {
    const usuarioJSON = sessionStorage.getItem('usuarioLogado');
    if (usuarioJSON) {
      this.usuarioAtual = JSON.parse(usuarioJSON);
    }
  }

  deslogarUsuario(): void {
    sessionStorage.removeItem('usuarioLogado');
    this.usuarioAtual = undefined;
    this.router.navigate(['/login-usuario'])
  }

  usuarioLogado(): Usuario | undefined {
    if (!this.usuarioAtual) {
      const usuarioJSON = sessionStorage.getItem('usuarioLogado');
      if (usuarioJSON) {
        this.usuarioAtual = JSON.parse(usuarioJSON);
      }
    }
    return this.usuarioAtual;
  }

  nomeUsuario(): string | undefined {
    return this.usuarioLogado()?.nome;
  }



  // atualizarUsuario(id: number, novosDados: Partial<Usuario>): void {
  //   const index = this.usuarios.findIndex(u => u.id === id);
  //   if (index !== -1) {
  //     this.usuarios[index] = { ...this.usuarios[index], ...novosDados };
  //   }
  // }

  // emailExiste(email: string): boolean {
  //   return this.usuarios.some(user => user.email === email);
  // }
  //
  // getUsuarioPorEmail(email: string): Usuario | undefined {
  //   return this.usuarios.find(user => user.email === email);
  // }

}
