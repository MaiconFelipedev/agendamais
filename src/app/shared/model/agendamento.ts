import {Cliente} from './cliente';
import {Servico} from './servico';
import {parse} from 'date-fns';

export class Agendamento {

    constructor(
      private _data: Date,
      private _horario: string[],
      private _cliente: Cliente,
      private _servico: Servico,
      private _valorTotal: number,
      private _status: string = "Confirmado",
      private _id ?: number
    ) {}

    // Getter para acessar a data do agendamento
    get data(): Date {
      return this._data;
    }

    get nomeCliente(): string {
      return this._cliente.nome;
    }

    get nomeServico(): string {
      return this._servico.nome;
    }

    // Getter para acessar o início do serviço
    get horarioInicio(): Date {
      return parse(this._horario[0], "dd/MM/yyyy", new Date());
    }

    get horarioTermino(): Date {
      return parse(this._horario[1], "dd/MM/yyyy", new Date());
    }

    get status(): string {
      return this._status
    }

    get id(): number | undefined{
      return this._id;
    }

    set id(novoId: number){
      this._id = novoId;
    }

    set status(novoStatus: string){
      this._status = novoStatus
    }

    cancelar(): void {
      this._status = "Cancelado";
      console.log(`Agendamento ${this._id} foi cancelado.`);
    }

    reagendar(novaData: Date, novoHorarioInicio: string, novoHorarioFinal: string): void {
      this._data = novaData;
      this._horario[0] = novoHorarioInicio;
      this._horario[1] = novoHorarioFinal;
      this._status = "Reagendado";
      console.log(
        `Agendamento ${this._id} foi reagendado para ${this._data} às ${this._horario[0]}-${this._horario[1]}.`
      );
    }
  }
