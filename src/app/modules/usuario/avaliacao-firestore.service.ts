import { Injectable } from '@angular/core';
import {getFirestore, collection, addDoc, query, where, getDocs, updateDoc, doc} from '@angular/fire/firestore';
import { Avaliacao } from '../../shared/model/avaliacao';
import { from, map, Observable } from 'rxjs';
import {Agendamento} from '../../shared/model/agendamento';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoFirestoreService {

  private bancoRemoto = getFirestore();
  private colecaoAvaliacoes = collection(this.bancoRemoto, "avaliacoes");
  private colecaoAgendamentos = collection(this.bancoRemoto, "agendamentos");

  salvar(avaliacao: Avaliacao, servico: Agendamento): Observable<Avaliacao | null> {
    delete avaliacao.id;

    return from(addDoc(this.colecaoAvaliacoes, { ...avaliacao })).pipe(
      map(docRef => {
        // Atualiza o status do agendamento para "Avaliado"
        const servicoRef = doc(this.bancoRemoto, 'agendamentos', servico.id!);
        updateDoc(servicoRef, { status: 'Avaliado' }).then(() => {
          console.log('Status do agendamento atualizado para Avaliado');
        }).catch((error) => {
          console.error('Erro ao atualizar status do agendamento:', error);
        });

        return new Avaliacao(
          avaliacao.comentario,
          avaliacao.data,
          avaliacao.idPrestador,
          avaliacao.nota,
          docRef.id
        );
      })
    );
  }


  // Retorna as avaliações associadas a um determinado prestador
  getAvaliacoesPorPrestador(idPrestador: string): Observable<Avaliacao[]> {
    const q = query(this.colecaoAvaliacoes, where("idPrestador", "==", idPrestador));
    return from(getDocs(q)).pipe(
      map(querySnapshot => {
        const avaliacoes: Avaliacao[] = [];
        querySnapshot.forEach(doc => {
          const data = doc.data() as Avaliacao;

          avaliacoes.push(new Avaliacao(
            data.comentario,
            data.data,
            data.idPrestador,
            data.nota,
            doc.id
          ));
        });
        return avaliacoes;
      })
    );
  }

  getMediaNotasPorPrestador(idPrestador: string): Observable<number> {
      const q = query(this.colecaoAvaliacoes, where("idPrestador", "==", idPrestador));

      return from(getDocs(q)).pipe(
          map(querySnapshot => {
              let somaNotas = 0;
              let totalAvaliacoes = 0;

              querySnapshot.forEach(doc => {
                  const data = doc.data();
                  const nota = data['nota'];

                  if (typeof nota === 'number') { // Garantindo que seja um número
                      somaNotas += nota;
                      totalAvaliacoes++;
                  }
              });

              // Se não houver avaliações, retorna 0
              return totalAvaliacoes > 0 ? somaNotas / totalAvaliacoes : 0;
          })
      );
  }

  getServicosConcluidosDoCliente(idCliente: string): Observable<Agendamento[]> {
    const q = query(this.colecaoAgendamentos,
      where("cliente.id", "==", idCliente),
      where("status", "in", ["Concluído", "Avaliado"])
    );

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
