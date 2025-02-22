import { Injectable } from '@angular/core';
import {Agenda} from '../../shared/model/agenda';
import {DiaDeTrabalho} from '../../shared/model/dia-trabalho';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  private agendas: Agenda[] = [];
  public agendaAtual: Agenda | undefined;
  private nextId = 1;

  constructor() { }

  private gerarId(): number {
    return this.nextId++;
  }

  // salvarAgenda(agenda: Agenda): void {
  //   agenda.id = this.gerarId();
  //   this.agendas.push(agenda);
  //   this.agendaAtual = agenda;
  // }

  resgatarAgenda(): Agenda | undefined{
    return this.agendaAtual;
  }

  resgatarDiaTrabalho(data: string): DiaDeTrabalho | undefined{
    return this.agendaAtual?.diasDeTrabalho.filter(diaDeTrabalho => diaDeTrabalho.dataFormatada === data)[0];
  }
}
