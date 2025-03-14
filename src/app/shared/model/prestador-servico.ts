import { Usuario } from './usuario';

export class PrestadorServico extends Usuario {
  constructor(
    nome: string,
    email: string,
    senha: string,
    telefone: string,
    tipo: string,
    endereco: { rua: string; bairro: string; cidade: string; estado: string },
    verificado: boolean,
    id?: string
  ) {
    super(nome, email, senha, telefone, tipo, endereco, verificado, id);
    }

  // Método para converter o objeto em um formato simples
  toObject(): any {
    return {
      id: this.id,
      nome: this.nome,
      email: this.email,
      telefone: this.telefone,
      endereco: this.endereco
    };
  }
}
