import { parse } from "date-fns";
import { DiaDeTrabalho } from './dia-trabalho';
import { DiasDaSemana } from './dias-da-semana.enum';
import { obterDiasDoMes } from './dias-por-mes.enum';

class AgendaMes {
  constructor(
    private _dataReferencia: string,
    private _diasDeTrabalho: DiaDeTrabalho[] = [],
    private _id ?: Number
  ) {}

  get id() : Number | undefined {
    return this._id;
  }

  get dataReferencia(): Date {
    return parse(this._dataReferencia, "dd/MM/yyyy", new Date());
  }

  get diasDeTrabalho(): DiaDeTrabalho[] {
    return this._diasDeTrabalho;
  }

  gerarDiasDeTrabalho(diasDeFolga: DiasDaSemana[], horaInicioIntervalo: String, horaFinalIntervalo: String): void{
    const qntDiasDeTrabalho: number = (obterDiasDoMes(this.dataReferencia.getMonth()+1, this.dataReferencia.getFullYear())) - diasDeFolga.length;

    // terminar
  }
}
