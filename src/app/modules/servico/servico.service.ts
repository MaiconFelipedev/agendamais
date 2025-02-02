import { Injectable } from '@angular/core';
import { Servico } from '../../shared/model/servico';


@Injectable({
  providedIn: 'root'
})
export class ServicoService {
  private servicos: Servico[] = [];
  private nextId = 1;

  constructor() { }

  private gerarId(): number {
    return this.nextId++;
  }



  getServicos(categoria: string = ''): Servico[] {
    if (categoria) {
      return this.listarPorCategoria(categoria);
    }
    return this.servicos;
  }

  listarPorCategoria(categoria: string): Servico[] {
    return this.servicos.filter(servico => servico.categoria === categoria);
  }

  gerarCategorias(): string[] {
    // Extrai as categorias únicas dos serviços cadastrados
    const categorias = this.servicos.map(servico => servico.categoria);
    return Array.from(new Set(categorias)); // Remove duplicatas
  }
}
