import {Cliente} from './cliente';
import {Servico} from './servico';
import {format} from 'date-fns';

export class Agendamento {

    constructor(
      private _horarioInicial: Date,
      private _horarioFinal: Date | null = null,
      private _cliente: Cliente,
      private _servico: Servico,
      private _valorTotal: number,
      private _status: string = "Solicitado",
      private _formaPagamento: string,
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
        formaPagamento: this._formaPagamento,
        status: this._status,
        id: this._id
      };
    }

    // Getter para acessar a data do agendamento
    get data(): string {
      return format(this._horarioInicial, "dd/MM/yyyy");
    }

    get horario(): string{
      return `${format(this._horarioInicial, "HH:mm")} - ${format(this._horarioFinal!, "HH:mm")}`
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

    get formaPagamento(): string {
      return this._formaPagamento;
    }

    set formaPagamento(formaPagamento: string){
      this._formaPagamento = formaPagamento;
    }

    aceitar(): void {
      this._status = "Pagamento pendente";
    }

    confirmar(): void {
      this._status = "Confirmado";
    }

    cancelar(): void {
      this._status = "Cancelado";
    }
    recusar(): void {
      this._status = "Recusado";
    }

    reagendar(novoHorarioInicial: Date, novoHorarioFinal: Date): void {
      this._horarioInicial = novoHorarioInicial;
      this._horarioFinal= novoHorarioFinal;
    }

    private converterDuracao(tempo: string): number {
      const [horas, minutos] = tempo.split(":").map(Number);
      return horas * 60 + minutos;
    }

    avaliar(): void {
      this._status = "Avaliado";
    }
}
