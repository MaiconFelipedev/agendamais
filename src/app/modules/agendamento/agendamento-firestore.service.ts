import { Injectable } from '@angular/core';
import { getFirestore, collection, addDoc, query, where, getDocs, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Agendamento } from '../../shared/model/agendamento';
import { from, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoFirestoreService {

  private bancoRemoto = getFirestore();
  private colecaoAgendamentos = collection(this.bancoRemoto, "agendamentos");

  constructor() { }

  verificarConflitos(prestadorId: string, horarioInicial: Date, horarioFinal: Date): Observable<Agendamento[]> {
    const q = query(
        this.colecaoAgendamentos,
        where("servico.prestador.id", "==", prestadorId),
        where("status", "==", "Confirmado"),
        where("horarioInicial", "<", horarioFinal), // Verifica se o horário inicial é antes do horário final solicitado
        where("horarioFinal", ">", horarioInicial) // Verifica se o horário final é depois do horário inicial solicitado
    );

    return from(getDocs(q)).pipe(
        map(resposta => {
          return resposta.docs.map(doc => {
            const data = doc.data();
            return new Agendamento(
                data['horarioInicial'].toDate(), // Converte Firestore Timestamp para Date
                data['horarioFinal'].toDate(),
                data['cliente'],
                data['servico'],
                data['valorTotal'],
                data['status'],
                doc.id
            );
          });
        })
    );
  }

  // Insere um agendamento e retorna um Observable do agendamento com o ID do Firestore
  inserir(agendamento: Agendamento): Observable<Agendamento> {
    const agendamentoSimples = agendamento.toObject(); // Converte para um objeto simples
    delete agendamentoSimples.id;

    return from(addDoc(this.colecaoAgendamentos, agendamentoSimples)).pipe(
      map(agendamentoSalvo => {
        return new Agendamento(
          agendamento.horarioInicial,
          agendamento.horarioFinal,
          agendamento.cliente,
          agendamento.servico,
          agendamento.valorTotal,
          agendamento.status,
          agendamentoSalvo.id // Atribui o ID gerado pelo Firestore
        );
      })
    );
  }

  atualizar(agendamento: Agendamento): Observable<void> {
    const docRef = doc(this.bancoRemoto, "agendamentos", agendamento.id!);
    return from(updateDoc(docRef, { ...agendamento }));
  }

  remover(agendamento: Agendamento): Observable<void> {
    const docRef = doc(this.bancoRemoto, "agendamentos", agendamento.id!);
    return from(deleteDoc(docRef));
  }

  listarTodos(): Observable<Agendamento[]> {
    const q = query(this.colecaoAgendamentos);
    return from(getDocs(q)).pipe(
      map(resposta => {
        return resposta.docs.map(doc => {
          const data = doc.data();
          const horarioInicial = data['horarioInicial']?.toDate
              ? data['horarioInicial'].toDate()
              : new Date(data['horarioInicial']);

          const horarioFinal = data['horarioFinal']
              ? (data['horarioFinal'].toDate
                  ? data['horarioFinal'].toDate()
                  : new Date(data['horarioFinal']))
              : null;
          return new Agendamento(
            horarioInicial,
            horarioFinal,
            data['cliente'],
            data['servico'],
            data['valorTotal'],
            data['status'],
            doc.id
          );
        });
      })
    );
  }

  // Busca agendamentos por status (exemplo: "Solicitado", "Confirmado" ou "Rejeitado")
  buscarPorStatus(status: string): Observable<Agendamento[]> {
    const q = query(this.colecaoAgendamentos, where("status", "==", status));
    return from(getDocs(q)).pipe(
      map(resposta => {
        return resposta.docs.map(doc => {
          const data = doc.data();
          return new Agendamento(
            data['horarioInicial'],
            data['horarioFinal'],
            data['cliente'],
            data['servico'],
            data['valorTotal'],
            data['status'],
            doc.id
          );
        });
      })
    );
  }

  // Busca agendamentos por cliente (usando o ID)
  buscarPorCliente(clienteId: string): Observable<Agendamento[]> {
    const q = query(this.colecaoAgendamentos, where("cliente.id", "==", clienteId));
    return from(getDocs(q)).pipe(
      map(resposta => {
        return resposta.docs.map(doc => {
          const data = doc.data();
          const horarioInicial = data['horarioInicial']?.toDate
            ? data['horarioInicial'].toDate()
            : new Date(data['horarioInicial']);

          const horarioFinal = data['horarioFinal']
            ? (data['horarioFinal'].toDate
              ? data['horarioFinal'].toDate()
              : new Date(data['horarioFinal']))
            : null;
          return new Agendamento(
            horarioInicial,
            horarioFinal,
            data['cliente'],
            data['servico'],
            data['valorTotal'],
            data['status'],
            doc.id
          );
        });
      })
    );
  }

  buscarPorPrestador(prestadorId: string | undefined): Observable<Agendamento[]> {

    const q = query(this.colecaoAgendamentos, where("servico.prestador.id", "==", prestadorId));

    return from(getDocs(q)).pipe(
      map(resposta => {
        return resposta.docs.map(doc => {
          const data = doc.data();

          const horarioInicial = data['horarioInicial']?.toDate
            ? data['horarioInicial'].toDate()
            : new Date(data['horarioInicial']);

          const horarioFinal = data['horarioFinal']
            ? (data['horarioFinal'].toDate
              ? data['horarioFinal'].toDate()
              : new Date(data['horarioFinal']))
            : null;

          return new Agendamento(
            horarioInicial,
            horarioFinal,
            data['cliente'],
            data['servico'],
            data['valorTotal'],
            data['status'],
            doc.id
          );
        });
      })
    );
  }

}
