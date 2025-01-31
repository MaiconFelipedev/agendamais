import {Agendamento} from './agendamento';

export class Pagamento {

    constructor(
    private _agendamento: Agendamento,
    private _metodo: string,
    private _status: string,
    private _valor: number,
    private _id?: number
    ) {}

    processarPagamento(): void {

      if (this._metodo && this._valor > 0) {
        this._status = "Processado";
        console.log(`Pagamento de R$${this._valor} processado com sucesso.`);
      } else {
        console.log("Falha ao processar pagamento.");
      }
    }
  }

