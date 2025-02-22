import {parse, addDays, subDays} from "date-fns";
import { DiaDeTrabalho } from './dia-trabalho';

export class Agenda {

  constructor(
    private _periodo: Date[],
    private _horarioTrabalho: string[],
    private _diasDeTrabalho: DiaDeTrabalho[] = [],
    private _statusAgenda: string = "Aberta",
    private _id?: number,
    private _idPrestador?: string
  ) {}

  get id() : number | undefined {
    return this._id;
  }

  set id(novoId: string) {
    this._idPrestador = novoId;
  }

  get idPrestador() : string | undefined {
    return this._idPrestador;
  }

  set idPrestador(novoIdPrestador: string) {
    this._idPrestador = novoIdPrestador;
  }

  get dataInicialAgenda(): Date {
    return this._periodo[0];
  }

  get dataFinalAgenda(): Date {
    return this._periodo[1];
  }

  get inicioExpediente(): Date {
    return parse(`${this._horarioTrabalho[0]}`, "HH:mm", new Date());
  }

  get terminoExpediente(): Date {
    return parse(`${this._horarioTrabalho[1]}`, "HH:mm", new Date());
  }

  get horarioTrabalho(): string[]{
    return this._horarioTrabalho;
  }

  get diasDeTrabalho(): DiaDeTrabalho[] {
    return this._diasDeTrabalho;
  }

  get statusAgenda(): string {
    return this._statusAgenda;
  }

  gerarDiasDeTrabalho(diasDeFolga: number[], horarioIntervalo: string[]): void{
    let ultimaData: Date = subDays(this.dataInicialAgenda, 1);

    while(ultimaData.getTime() < this.dataFinalAgenda.getTime()){
      let novaData = addDays(ultimaData, 1);
      if(diasDeFolga.includes(novaData.getDay())){
        this._diasDeTrabalho.push(new DiaDeTrabalho(novaData, horarioIntervalo, [], "Indisponível"));
        ultimaData = novaData;
        continue;
      }

      this._diasDeTrabalho.push(new DiaDeTrabalho(novaData, horarioIntervalo, []));

      ultimaData = novaData;
    }
    console.log(this._diasDeTrabalho);
  }
}
