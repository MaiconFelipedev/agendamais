import { Injectable } from '@angular/core';
import {Agenda} from '../../shared/model/agenda';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  private agendas: Agenda[] = [];
  private nextId = 1;

  constructor() { }

  private gerarId(): number {
    return this.nextId++;
  }

  salvarAgenda(agenda: Agenda): void {
    agenda.id = this.gerarId();
    this.agendas.push(agenda);
  }

  resgatarPorId(idPrestador: number | undefined): Agenda | undefined {
    return this.agendas.find(agenda => agenda.idPrestador === idPrestador)
  }
}
