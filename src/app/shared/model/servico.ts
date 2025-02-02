import { PrestadorServico } from './prestador-servico';
import { Agendamento } from './agendamento';

export class Servico {
  private _id: number;
  private _nome: string;
  private _descricao: string;
  private _preco: number;
  // Duração em minutos
  private _duracao: number;
  // Oferece o Servico
  private _prestador: PrestadorServico;
  // Agendamentos feitos para esse servico
  private _agendamentos: Agendamento[] = [];

  constructor(
    id: number,
    nome: string,
    descricao: string,
    preco: number,
    duracao: number,
    prestador: PrestadorServico
  ) {
    this._id = id;
    this._nome = nome;
    this._descricao = descricao;
    this._preco = preco;
    this._duracao = duracao;
    this._prestador = prestador;
  }

  get id(): number {
    return this._id;
  }

  get nome(): string {
    return this._nome;
  }

  get descricao(): string {
    return this._descricao;
  }

  get preco(): number {
    return this._preco;
  }

  get duracao(): number {
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
  atualizarInformacoes(nome: string, descricao: string, preco: number, duracao: number): Servico {
    this._nome = nome;
    this._descricao = descricao;
    this._preco = preco;
    this._duracao = duracao;
    return this;
    // console.log(`Serviço ${this._nome} atualizado com sucesso.`);
  }
}