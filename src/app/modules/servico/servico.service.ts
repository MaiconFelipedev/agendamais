import { Injectable } from '@angular/core';
import { Servico } from '../../shared/model/servico';
import { ServicoFirestoreService } from './servico-firestore.service';
import { Observable } from 'rxjs';
import { Endereco } from '../../shared/model/enderecoServico';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {
  constructor(private servicoFirestoreService: ServicoFirestoreService) {}

  cadastrarServico(servico: Servico): Observable<Servico | null> {
    return this.servicoFirestoreService.cadastrar(servico);
  }

  getServicos(): Observable<Servico[]> {
    return this.servicoFirestoreService.listarServicos();
  }

  getServicosPorCategoria(categoria: string = ''): Observable<Servico[]> {
    if (categoria) {
      return this.servicoFirestoreService.listarPorTipo(categoria);
    }
    return this.servicoFirestoreService.listarServicos();
  }

  getServicosPorLocalizacao(endereco: Endereco): Observable<Servico[]> {
    if(endereco) {
      return this.servicoFirestoreService.listarPorEndereco(endereco);
    }

    return this.servicoFirestoreService.listarServicos();

  }

  gerarTipos(): Observable<string[]> {
    return this.servicoFirestoreService.gerarTipos();
  }
}