import {Observable, of, switchMap} from 'rxjs';
import {Agendamento} from '../../shared/model/agendamento';
import {Injectable} from '@angular/core';
import {AgendamentoFirestoreService} from './agendamento-firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  constructor(private agendamentoFirestoreService: AgendamentoFirestoreService) { }

  // Método para verificar conflitos e inserir o agendamento


  agendarComVerificacao(agendamento: Agendamento): Observable<Agendamento | string> {
    const prestadorId = agendamento.servico.prestador?.id;

    if (!prestadorId) {
      return of("Prestador não encontrado.");
    }

    return this.agendamentoFirestoreService.verificarConflitos(
      prestadorId,
      agendamento.horarioInicial,
      agendamento.horarioFinal!
    ).pipe(
      switchMap(conflitos => {
        if (conflitos.length > 0) {
          return of("Erro! O prestador já tem um agendamento confirmado nessa faixa de horário.");
        } else {
          return this.agendamentoFirestoreService.inserir(agendamento);
        }
      })
    );
  }

  inserir(agendamento: Agendamento): Observable<Agendamento> {
    return this.agendamentoFirestoreService.inserir(agendamento);
  }

  atualizar(agendamento: Agendamento): Observable<void> {
    return this.agendamentoFirestoreService.atualizar(agendamento);
  }

  remover(agendamento: Agendamento): Observable<void> {
    return this.agendamentoFirestoreService.remover(agendamento);
  }

  listarTodos(): Observable<Agendamento[]> {
    return this.agendamentoFirestoreService.listarTodos();
  }

  buscarPorStatus(status: string): Observable<Agendamento[]> {
    return this.agendamentoFirestoreService.buscarPorStatus(status);
  }

  buscarPorCliente(clienteId: string): Observable<Agendamento[]> {
    return this.agendamentoFirestoreService.buscarPorCliente(clienteId);
  }

  buscarPorPrestador(prestadorId: string | undefined): Observable<Agendamento[]> {
    return this.agendamentoFirestoreService.buscarPorPrestador(prestadorId);
  }
}
