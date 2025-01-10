import {Avaliacao} from './avaliacao';
import {Agendamento} from './agendamento';

export class AvaliacaoCliente extends Avaliacao {
  constructor(
    id: number,
    agendamento: Agendamento,
    nota: number,
    data: Date
  ) {
    super(id, agendamento, nota, data);
  }

  avaliar(cliente: Cliente): void {
    console.log(`Avaliando cliente, nota: ${this.nota}`);
  }
}
