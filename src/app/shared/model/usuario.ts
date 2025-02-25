export class Usuario {
  id?: string;
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  endereco: {
    rua: string;
    bairro: string;
    cidade: string;
    estado: string;
  };
  tipo: string;
  avaliacaoMedia: number;

  constructor(nome: string, email: string, senha: string, telefone: string, tipo: string,
              endereco: { rua: string; bairro: string; cidade: string; estado: string }, id?: string) {
      this.nome = nome;
      this.email = email;
      this.senha = senha;
      this.telefone = telefone;
      this.endereco = endereco;
      this.tipo = tipo;
      this.avaliacaoMedia = 0;
      this.id = id;
  }
}
