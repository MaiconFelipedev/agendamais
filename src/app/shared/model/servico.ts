import { PrestadorServico } from './prestador-servico';
import { Agendamento } from './agendamento';

export class Servico {
  private _id?: string | undefined;
  private _nome: string;
  private _tipo: string;
  private _preco: number;
  private _duracao: string;
  private _descricao: string;
  private _prestador?: PrestadorServico;

  constructor(
    nome: string,
    tipo: string,
    preco: number,
    duracao: string,
    descricao: string,
    prestador?: PrestadorServico,
    id?: string
  ) {
    this._nome = nome;
    this._tipo = tipo;
    this._preco = preco;
    this._duracao = duracao;
    this._descricao = descricao;
    this._prestador = prestador;
    this._id = id;
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
      prestador: this._prestador?.toObject ? this._prestador.toObject() : this._prestador
    };
  }

  get id(): string| undefined {
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

  get tipo(): string { // Getter para tipo
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
}

