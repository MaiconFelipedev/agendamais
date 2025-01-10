class Agendamento {
 
    constructor(
      private _data: Date,
      private _horarioInicio: string,
      private _horarioFinal: string,
      private _cliente: Cliente,
      private _servico: Servico,
      private _valorTotal: number,
      private _status: string = "Agendado",
      private _id ?: number
    ) {}
  
    cancelar(): void {
      this._status = "Cancelado";
      console.log(`Agendamento ${this._id} foi cancelado.`);
    }
  
    reagendar(novaData: Date, novoHorarioInicio: string, novoHorarioFinal: string): void {
      this._data = novaData;
      this._horarioInicio = novoHorarioInicio;
      this._horarioFinal = novoHorarioFinal;
      this._status = "Reagendado";
      console.log(
        `Agendamento ${this._id} foi reagendado para ${this._data} às ${this._horarioInicio}-${this._horarioFinal}.`
      );
    }
  }
  