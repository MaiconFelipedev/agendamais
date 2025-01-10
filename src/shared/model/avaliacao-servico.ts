import {Avaliacao} from './avaliacao';
import {Agendamento} from './agendamento';

export class AvaliacaoServico extends Avaliacao {
  constructor(
    id: number,
    agendamento: Agendamento,
    nota: number,
    data: Date,
    public comentario: string
  ) {
    super(id, agendamento, nota, data);
  }

  avaliar(prestadorServico: PrestadorServico): void {
    console.log(`Avaliando prestador, nota: ${this.nota}. Comentário: ${this.comentario}`);
  }
}
