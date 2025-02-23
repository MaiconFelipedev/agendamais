import { PrestadorServico } from './prestador-servico';
import { Agendamento } from './agendamento';

export class Servico {
  private _id?: string | undefined;
  private _nome: string;
  private _tipo: string;
  private _preco: number;
  private _duracao: string;
  private _descricao: string;
  private _prestador?: string;
  // Agendamentos feitos para esse servico
  private _agendamentos: Agendamento[] = [];

  constructor(
    nome: string,
    tipo: string,
    preco: number,
    duracao: string,
    descricao: string,
    prestador?: string,
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

  get id(): string| undefined {
    return this._id;
  }

  set id(id) {
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

  get prestador(): string | undefined {
    return this._prestador;
  }

  get agendamentos(): Agendamento[] {
    return this._agendamentos;
  }

  // Adiciona novo agendamento ao servico
  agendarServico(agendamento: Agendamento): Agendamento | null {
    if (this._agendamentos.some(a => a.data === agendamento.data && a.horarioInicio === agendamento.horarioInicio)) {
      console.log('Horário já ocupado para este serviço.');
      // Erro
      return null; // Caso de erro, você pode retornar null ou algum tipo de erro.
    }
    this._agendamentos.push(agendamento);
    return agendamento;
    // console.log(`Serviço ${this._nome} agendado para ${agendamento.data} às ${agendamento.horarioInicio}`);
  }

  // Atualizar as informações do serviço
  atualizarInformacoes(nome: string, descricao: string, tipo: string, preco: number, duracao: string): Servico {
    this._nome = nome;
    this._descricao = descricao;
    this._tipo = tipo;
    this._preco = preco;
    this._duracao = duracao;
    return this;
    // console.log(`Serviço ${this._nome} atualizado com sucesso.`);
  }
}

