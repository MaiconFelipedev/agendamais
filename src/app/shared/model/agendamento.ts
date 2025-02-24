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
    ) {
      if (!this._horarioFinal) {
        const duracao = this.converterDuracao(this._servico.duracao);
        this._horarioFinal = new Date(this._horarioInicial.getTime() + duracao * 60000);
      }
    }

  // Método para converter o objeto em um formato simples
  toObject(): any {
    return {
      horarioInicial: this._horarioInicial,
      horarioFinal: this._horarioFinal,
      cliente: this._cliente.toObject ? this._cliente.toObject() : this._cliente,
      servico: this._servico.toObject ? this._servico.toObject() : this._servico,
      valorTotal: this._valorTotal,
      status: this._status,
      id: this._id
    };
  }

    // Getter para acessar a data do agendamento
    get data(): string {
      const dia = this._horarioInicial.getDate();
      const mes = this._horarioInicial.getMonth() + 1;
      const ano = this._horarioInicial.getFullYear();

      return `${dia}/${mes}/${ano}`;
    }

    get cliente(): Cliente {
      return this._cliente;
    }

    get servico(): Servico {
      return this._servico;
    }

    get valorTotal() {
      return this._valorTotal;
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

    private converterDuracao(tempo: string): number {
      const [horas, minutos] = tempo.split(":").map(Number);
      return horas * 60 + minutos;
    }
}
