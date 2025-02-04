import { PrestadorServico } from './prestador-servico';
import { Agendamento } from './agendamento';

export class Servico {
  private _id?: number;
  private _nome: string;
  private _categoria: string;
  private _preco: number;
  private _duracao: string;
  private _descricao: string;
  private _prestador: PrestadorServico;
  // Agendamentos feitos para esse servico
  private _agendamentos: Agendamento[] = [];

  constructor(
    nome: string,
    categoria: string,
    preco: number,
    duracao: string,
    descricao: string,
    prestador: PrestadorServico
  ) {
    this._nome = nome;
    this._categoria = categoria;
    this._preco = preco;
    this._duracao = duracao;
    this._descricao = descricao;
    this._prestador = prestador;
  }

  get id(): number | undefined {
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

  get categoria(): string { // Getter para categoria
    return this._categoria;
  }

  get preco(): number {
    return this._preco;
  }

  get duracao(): string {
    return this._duracao;
  }

  get prestador(): PrestadorServico {
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
  atualizarInformacoes(nome: string, descricao: string, categoria: string, preco: number, duracao: string): Servico {
    this._nome = nome;
    this._descricao = descricao;
    this._categoria = this.categoria;
    this._preco = preco;
    this._duracao = duracao;
    return this;
    // console.log(`Serviço ${this._nome} atualizado com sucesso.`);
  }
}

