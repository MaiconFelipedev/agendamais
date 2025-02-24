import {Agendamento} from './agendamento';

export class Avaliacao {
  constructor(
    public agendamento: Agendamento,
    public nota: number,
    public data: Date,
    public comentario: string,
    public id?: number
  ) {}
}
