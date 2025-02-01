import {Agendamento} from './agendamento';

export class DiaDeTrabalho {
  constructor(
    private _data: Date,
    private _horarioIntervalo: string[],
    private _agendamentos: Agendamento[],
    private _status: string = "Disponível",
    private _id?: number
  ){}

  get id(): number | undefined {
    return this._id;
  }

  get data(): Date {
    return this._data;
  }

  get status(): string {
    return this._status;
  }

  get agendamentos(): Agendamento[] {
    return this._agendamentos;
  }

  get inicioIntervalo(): string {
    return this._horarioIntervalo[0];
  }

  get terminoIntervalo(): string {
    return this._horarioIntervalo[1];
  }

  editarIntervalo(novoIntervalo: string[]): void{
    this._horarioIntervalo[0] = novoIntervalo[0];
    this._horarioIntervalo[1] = novoIntervalo[1];
  }

  editarStatus(novoStatus: string): void {
    this._status = novoStatus;
  }
}
