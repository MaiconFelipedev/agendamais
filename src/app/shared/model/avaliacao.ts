import {Agendamento} from './agendamento';
import {Usuario} from './usuario';

export abstract class Avaliacao {

  protected constructor(
    public agendamento: Agendamento,
    public nota: number,
    public data: Date,
  ) {}

  abstract avaliar(usuario: Usuario): void;
}
