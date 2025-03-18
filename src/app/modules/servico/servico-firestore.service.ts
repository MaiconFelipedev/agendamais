import { Injectable } from '@angular/core';
import { getFirestore, collection, addDoc, query, where, getDocs } from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';
import { Servico } from '../../shared/model/servico';
import { Endereco } from '../../shared/model/enderecoServico';

@Injectable({
  providedIn: 'root'
})
export class ServicoFirestoreService {

  private bancoRemoto = getFirestore();
  private colecaoServicos = collection(this.bancoRemoto, "servicos");

  cadastrar(servico: Servico): Observable<Servico | null> {
    const servicoParaSalvar = {
      nome: servico.nome,
      tipo: servico.tipo,
      preco: servico.preco,
      duracao: servico.duracao,
      descricao: servico.descricao,
      endereco: servico.endereco,
      prestador: servico.prestador ? { ...servico.prestador } : null,
      formasPagamento: servico.formasPagamento
    };

    return from(addDoc(this.colecaoServicos, servicoParaSalvar))
      .pipe(
        map(servicoSalvo => {
          return new Servico(
            servico.nome,
            servico.tipo,
            servico.preco,
            servico.duracao,
            servico.descricao,
            servico.endereco,
            servico.prestador,
            servicoSalvo.id,
            servico.formasPagamento
          );
        })
      );
  }

  listarServicos(): Observable<Servico[]> {
    return from(getDocs(this.colecaoServicos)).pipe(
      map(querySnapshot => querySnapshot.docs.map(doc => {
        const data = doc.data();
        return new Servico(
          data['nome'],
          data['tipo'],
          data['preco'],
          data['duracao'],
          data['descricao'],
          data['endereco'],
          data['prestador'],
          doc.id,
          data['formasPagamento']
        );
      }))
    );
  }

  listarPorTipo(tipo: string): Observable<Servico[]> {
    const q = query(this.colecaoServicos, where("tipo", "==", tipo));
    return from(getDocs(q)).pipe(
      map(querySnapshot => querySnapshot.docs.map(doc => {
        const data = doc.data();
        return new Servico(
          data['nome'],
          data['tipo'],
          data['preco'],
          data['duracao'],
          data['descricao'],
          data['endereco'],
          data['prestador'],
          doc.id,
          data['formasPagamento']
        );
      }))
    );
  }

  gerarTipos(): Observable<string[]> {
    return this.listarServicos().pipe(
      map(servicos => {
        const tipos = servicos.map(servico => servico.tipo);
        return Array.from(new Set(tipos));
      })
    );
  }

  listarPorEndereco(endereco: Endereco): Observable<Servico[]> {
    const q = query(
      this.colecaoServicos,
      where("endereco.cidade", "==", endereco.cidade),
      where("endereco.estado", "==", endereco.estado)
    );

    return from(getDocs(q)).pipe(
      map(querySnapshot => querySnapshot.docs.map(doc => {
        const data = doc.data();
        return new Servico(
          data['nome'],
          data['tipo'],
          data['preco'],
          data['duracao'],
          data['descricao'],
          data['endereco'],
          data['prestador'],
          doc.id,
          data['formasPagamento']
        )
      }))
    )
  }

}