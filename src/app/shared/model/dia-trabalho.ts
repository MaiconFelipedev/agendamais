import {parse} from 'date-fns';
import {Agendamento} from './agendamento';

export class DiaDeTrabalho {
  constructor(
    private _data: string,
    private _horaInicioIntervalo: String,
    private _horaFinalIntervalo: String,
    private _agendamentos: Agendamento[] = [],
    private _status: String = "Disponível",
    private _id?: Number
  ){}

  get id(): Number | undefined {
    return this._id;
  }

  get data(): String {
    const dataFormatada: Date = parse(this._data, "dd/MM/yyyy", new Date());
    return `${dataFormatada.getDate()}/${dataFormatada.getMonth() + 1}/${dataFormatada.getFullYear()}`
  }

  get status(): String {
    return this._status;
  }

  get agendamentos(): Agendamento[] {
    return this._agendamentos;
  }

  get horarioIntervalo(): String{
    return `${this._horaInicioIntervalo}-${this._horaFinalIntervalo}`;
  }

  public editarIntervalo(novoIntervalo: String[]): void{
    this._horaInicioIntervalo = novoIntervalo[0];
    this._horaFinalIntervalo = novoIntervalo[1];
  }

  public editarStatus(novoStatus: String): void {
    this._status = novoStatus;
  }
}
