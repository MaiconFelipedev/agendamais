import {Agendamento} from './agendamento';

export class Avaliacao {
  constructor(
    public comentario: string,
    public data: string,
    public idPrestador: string,
    public nota: number,
    public id?: string
  ) {}
}
