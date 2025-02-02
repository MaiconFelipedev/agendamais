import { Injectable } from '@angular/core';
import { Usuario } from '../../shared/model/usuario';
import {PrestadorServico} from '../../shared/model/prestador-servico';
import {Cliente} from '../../shared/model/cliente';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarios: Usuario[] = [];
  private clientes: Cliente[] = [];
  private prestadores: PrestadorServico[] = [];
  private nextId = 1;

  constructor() { }

  private gerarId(): number {
    return this.nextId++;
  }

  cadastrarUsuario(usuario: Usuario): void {
    usuario.id = this.gerarId(); // Atribui um ID único
    if (usuario instanceof Cliente) {
      this.clientes.push(usuario)
    }
    if (usuario instanceof PrestadorServico) {
      this.prestadores.push(usuario);
    }
    this.usuarios.push(usuario)
  }

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
}

