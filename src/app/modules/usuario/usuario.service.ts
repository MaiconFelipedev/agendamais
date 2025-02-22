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
  private usuarios: Usuario[] = [];
  private clientes: Cliente[] = [];
  private prestadores: PrestadorServico[] = [];
  private nextId = 1;

  constructor(
    private usuarioFirestore: UsuarioFirestoreService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  private gerarId(): number {
    return this.nextId++;
  }

  estaCadastrado(email: string): Observable<boolean> {
    return this.usuarioFirestore.estaCadastrado(email).pipe(
      map(resultado => resultado != null)
    );
  }

  cadastrarNoBanco(usuario: Usuario){
    this.usuarioFirestore.cadastrar(usuario).subscribe({
      next: resultado => {
        if(resultado instanceof Usuario){
          this.router.navigate(['/login-usuario']).then(r => this.snackBar.open(`Usuário ${resultado.email} registrado com sucesso!`, 'Fechar', {
            duration: 3000
          }));
        }
      }
    })
  }

  // cadastrarUsuario(usuario: Usuario): void {
  //   usuario.id = this.gerarId(); // Atribui um ID único
  //   if (usuario instanceof Cliente) {
  //     this.clientes.push(usuario)
  //   }
  //   if (usuario instanceof PrestadorServico) {
  //     this.prestadores.push(usuario);
  //   }
  //   this.usuarios.push(usuario)
  // }

  getUsuarios(): Usuario[] {
    return this.usuarios;
  }

  autenticar(email: string, senha: string): boolean {
    return this.usuarios.some(user =>
      user.email === email && user.senha === senha
    );
  }


  // atualizarUsuario(id: number, novosDados: Partial<Usuario>): void {
  //   const index = this.usuarios.findIndex(u => u.id === id);
  //   if (index !== -1) {
  //     this.usuarios[index] = { ...this.usuarios[index], ...novosDados };
  //   }
  // }

  emailExiste(email: string): boolean {
    return this.usuarios.some(user => user.email === email);
  }

  getUsuarioPorEmail(email: string): Usuario | undefined {
    return this.usuarios.find(user => user.email === email);
  }

  logarUsuario(email: string): void {
    this.usuarioAtual = this.getUsuarioPorEmail(email);
  }

  deslogarUsuario(): void {
    this.usuarioAtual = undefined;
  }

  usuarioLogado(): Usuario | undefined {
    return this.usuarioAtual;
  }

  nomeUsuario(): string | undefined {
    return this.usuarioAtual?.nome;
  }
}
