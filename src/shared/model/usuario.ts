export class Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  endereco: string;
  tipo: string;
  avaliacaoMedia: number;

  constructor(id: number, nome: string, email: string, senha: string, telefone: string, endereco: string, tipo: string) {
      this.id = id;
      this.nome = nome;
      this.email = email;
      this.senha = senha;
      this.telefone = telefone;
      this.endereco = endereco;
      this.tipo = tipo;
      this.avaliacaoMedia = 0;
  }

  autenticar(email: string, senha: string): boolean {
      return this.email === email && this.senha === senha;
  }

  atualizarPerfil(nome: string, telefone: string, endereco: string): void {
      this.nome = nome;
      this.telefone = telefone;
      this.endereco = endereco;
  }

  calcularAvaliacao(nota: number): void {
      this.avaliacaoMedia = (this.avaliacaoMedia + nota) / 2;
  }
}
