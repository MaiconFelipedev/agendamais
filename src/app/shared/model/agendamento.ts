import {Cliente} from './cliente';
import {Servico} from './servico';

export class Agendamento {

    constructor(
      private _horarioInicial: Date,
      private _horarioFinal: Date | null = null,
      private _cliente: Cliente,
      private _servico: Servico,
      private _valorTotal: number,
      private _status: string = "Solicitado",
      private _id ?: string
    ) {}

    // Getter para acessar a data do agendamento
    get data(): string {
      const dia = this._horarioInicial.getDate();
      const mes = this._horarioInicial.getMonth() + 1;
      const ano = this._horarioInicial.getFullYear();

      return `${dia}/${mes}/${ano}`;
    }

    get nomeCliente(): string {
      return this._cliente.nome;
    }

    get nomeServico(): string {
      return this._servico.nome;
    }

    // Getter para acessar o início do serviço
    get horarioInicial(): Date {
      return this._horarioInicial;
    }

    get horarioFinal(): Date | null {
      return this._horarioFinal;
    }

    get status(): string {
      return this._status
    }

    get id(): string | undefined{
      return this._id;
    }

    set id(novoId: string){
      this._id = novoId;
    }

    confirmar(): void {
      this._status = "Confirmado";
    }

    rejeitar(): void {
      this._status = "Não aceito";
    }

    reagendar(novoHorarioInicial: Date, novoHorarioFinal: Date): void {
      this._horarioInicial = novoHorarioInicial;
      this._horarioFinal= novoHorarioFinal;
    }
}
