import {parse, addDays} from "date-fns";
import { DiaDeTrabalho } from './dia-trabalho';

export class Agenda {

  constructor(
    private _periodo: string[],
    private _diasDeTrabalho: DiaDeTrabalho[] = [],
    private _id ?: Number
  ) {}

  get id() : Number | undefined {
    return this._id;
  }

  get dataInicialAgenda(): Date {
    return parse(this._periodo[0], "dd/MM/yyyy", new Date());
  }

  get dataFinalAgenda(): Date {
    return parse(this._periodo[1], "dd/MM/yyyy", new Date());
  }

  get diasDeTrabalho(): DiaDeTrabalho[] {
    return this._diasDeTrabalho;
  }

  gerarDiasDeTrabalho(diasDeFolga: number[], horarioIntervalo: string[]): void{
    let ultimaData: Date = this.dataInicialAgenda;

    while(ultimaData.getTime() < this.dataFinalAgenda.getTime()){
      let novaData = addDays(ultimaData, 1);
      if(diasDeFolga.includes(novaData.getDay())){
        ultimaData = novaData;
        continue;
      }

      this._diasDeTrabalho.push(new DiaDeTrabalho(novaData, horarioIntervalo));

      ultimaData = novaData;
    }
  }
}
