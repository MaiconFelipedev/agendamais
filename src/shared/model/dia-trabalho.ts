import {parse} from 'date-fns';

export class DiaDeTrabalho {
  constructor(
    private _data: string,
    private _horaInicioIntervalo: String,
    private _horaFinalIntervalo: String,
    private _agendamentos: Agendamento[] = [],
    private _id?: Number
  ){}

  get id(): Number | undefined {
    return this._id;
  }

  get data(): String {
    const dataFormatada: Date = parse(this._data, "dd/MM/yyyy", new Date());
    return `${dataFormatada.getDate()}/${dataFormatada.getMonth() + 1}/${dataFormatada.getFullYear()}`
  }

  get agendamentos(): Agendamento[] {
    return this._agendamentos;
  }

  get horarioIntervalo(): String{
    return `${this._horaInicioIntervalo}-${this._horaFinalIntervalo}`;
  }

  public editarIntervalo(novaHoraInicio: String, novaHoraFinal: String): void{
    this._horaInicioIntervalo = novaHoraInicio;
    this._horaFinalIntervalo = novaHoraFinal;
  }
}
