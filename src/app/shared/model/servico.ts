import { PrestadorServico } from './prestador-servico';
import { Endereco } from './enderecoServico';

export class Servico {
  private _id?: string | undefined;
  private _nome: string;
  private _tipo: string;
  private _preco: number;
  private _duracao: string;
  private _descricao: string;
  private _endereco: Endereco;
  private _prestador?: PrestadorServico;
  private _formasPagamento: string[] = [];

  constructor(
    nome: string,
    tipo: string,
    preco: number,
    duracao: string,
    descricao: string,
    endereco: Endereco,
    prestador?: PrestadorServico,
    id?: string,
    formasPagamento: string[] = []
  ) {
    this._nome = nome;
    this._tipo = tipo;
    this._preco = preco;
    this._duracao = duracao;
    this._descricao = descricao;
    this._endereco = endereco;
    this._prestador = prestador;
    this._formasPagamento = formasPagamento;
    this._id = id;
    if (!endereco.rua || !endereco.bairro || !endereco.cidade || !endereco.estado) {
      throw new Error('Endereço incompleto!');
    }
  }

  // Método para converter o objeto em um formato simples
  toObject(): any {
    return {
      id: this._id,
      nome: this._nome,
      tipo: this._tipo,
      preco: this._preco,
      duracao: this._duracao,
      descricao: this._descricao,
      endereco: this._endereco,
      prestador: this._prestador?.toObject ? this._prestador.toObject() : this._prestador,
      formasPagamento: this._formasPagamento
    };
  }

  // Getters e Setters
  get id(): string | undefined {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  get nome(): string {
    return this._nome;
  }

  get descricao(): string {
    return this._descricao;
  }

  get tipo(): string {
    return this._tipo;
  }

  get preco(): number {
    return this._preco;
  }

  get duracao(): string {
    return this._duracao;
  }

  get prestador(): PrestadorServico | undefined {
    return this._prestador;
  }

  get formasPagamento(): string[] {
    return this._formasPagamento;
  }

  set formasPagamento(formasPagamento: string[]) {
    this._formasPagamento = formasPagamento;
  }

  get endereco(): Endereco {
    return this._endereco;
  }
}