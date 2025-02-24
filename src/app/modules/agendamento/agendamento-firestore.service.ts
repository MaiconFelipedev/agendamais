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
      where("servico.prestador.id", "==", prestadorId), // Filtra pelo prestador
      where("status", "==", "Confirmado"), // Filtra por agendamentos confirmados
      where("horarioInicial", "<", horarioFinal), // Verifica se o horário inicial é antes do horário final solicitado
      where("horarioFinal", ">", horarioInicial) // Verifica se o horário final é depois do horário inicial solicitado
    );

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

  // Insere um agendamento e retorna um Observable do agendamento com o ID do Firestore
  inserir(agendamento: Agendamento): Observable<Agendamento> {
    const agendamentoSimples = agendamento.toObject(); // Converte para um objeto simples
    delete agendamentoSimples.id; // Remove o ID para evitar conflitos ao salvar no Firestore

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

  // Atualiza um agendamento existente
  atualizar(agendamento: Agendamento): Observable<void> {
    const docRef = doc(this.bancoRemoto, "agendamentos", agendamento.id!);
    return from(updateDoc(docRef, { ...agendamento }));
  }

  // Remove um agendamento
  remover(agendamento: Agendamento): Observable<void> {
    const docRef = doc(this.bancoRemoto, "agendamentos", agendamento.id!);
    return from(deleteDoc(docRef));
  }

  // Lista todos os agendamentos
  listarTodos(): Observable<Agendamento[]> {
    const q = query(this.colecaoAgendamentos);
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
            doc.id // Atribui o ID do Firestore
          );
        });
      })
    );
  }

  // Busca agendamentos por status (exemplo: "Solicitado", "Confirmado", etc.)
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

  // Busca agendamentos por cliente (usando o ID do cliente)
  buscarPorCliente(clienteId: string): Observable<Agendamento[]> {
    const q = query(this.colecaoAgendamentos, where("cliente.id", "==", clienteId));
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
}
