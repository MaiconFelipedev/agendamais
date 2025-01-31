import {Avaliacao} from './avaliacao';
import {Agendamento} from './agendamento';
import {Cliente} from './cliente';

export class AvaliacaoCliente extends Avaliacao {
  constructor(
    agendamento: Agendamento,
    nota: number,
    data: Date,
    private id?: number
  ) {
    super(agendamento, nota, data);
  }

  avaliar(cliente: Cliente): void {
    console.log(`Avaliando cliente, nota: ${this.nota}`);
  }
}
