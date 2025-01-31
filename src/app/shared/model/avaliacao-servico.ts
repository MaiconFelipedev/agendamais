import {Avaliacao} from './avaliacao';
import {Agendamento} from './agendamento';
import {PrestadorServico} from './prestador-servico';

export class AvaliacaoServico extends Avaliacao {
  constructor(
    agendamento: Agendamento,
    nota: number,
    data: Date,
    public comentario: string,
    private id?: number
  ) {
    super(agendamento, nota, data);
  }

  avaliar(prestadorServico: PrestadorServico): void {
    console.log(`Avaliando prestador, nota: ${this.nota}. Comentário: ${this.comentario}`);
  }
}
