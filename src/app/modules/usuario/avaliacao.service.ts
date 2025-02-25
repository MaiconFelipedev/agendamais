import { Injectable } from '@angular/core';
import { Avaliacao } from '../../shared/model/avaliacao';
import { AvaliacaoFirestoreService } from './avaliacao-firestore.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import {Agendamento} from '../../shared/model/agendamento';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {

  constructor(
    private avaliacaoFirestore: AvaliacaoFirestoreService,
    private snackBar: MatSnackBar
  ) { }

  salvarAvaliacao(avaliacao: Avaliacao, servico: Agendamento): Observable<Avaliacao | null> {
    return this.avaliacaoFirestore.salvar(avaliacao, servico);
  }

  getAvaliacoesPorPrestador(idPrestador: string): Observable<Avaliacao[]> {
    return this.avaliacaoFirestore.getAvaliacoesPorPrestador(idPrestador);
  }

  getMediaNotasPorPrestador(idPrestador: string) {
    return this.avaliacaoFirestore.getMediaNotasPorPrestador(idPrestador);
  }

  getServicosConcluidosDoCliente(idCliente: string): Observable<any[]> {
    return this.avaliacaoFirestore.getServicosConcluidosDoCliente(idCliente);
  }

}
