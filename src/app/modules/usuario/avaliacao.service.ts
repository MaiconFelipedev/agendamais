import { Injectable } from '@angular/core';
import { Avaliacao } from '../../shared/model/avaliacao';
import { AvaliacaoFirestoreService } from './avaliacao-firestore.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {

  constructor(
    private avaliacaoFirestore: AvaliacaoFirestoreService,
    private snackBar: MatSnackBar
  ) { }

  salvarAvaliacao(avaliacao: Avaliacao): Observable<Avaliacao | null> {
    return this.avaliacaoFirestore.salvar(avaliacao);
  }

  getAvaliacoesPorPrestador(idPrestador: string): Observable<Avaliacao[]> {
    return this.avaliacaoFirestore.getAvaliacoesPorPrestador(idPrestador);
  }

  getMediaNotasPorPrestador(idPrestador: string) {
    return this.avaliacaoFirestore.getMediaNotasPorPrestador(idPrestador);
  }

}
