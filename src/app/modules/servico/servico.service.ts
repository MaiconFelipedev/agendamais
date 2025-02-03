import { Injectable } from '@angular/core';
import { Servico } from '../../shared/model/servico';
import {Usuario} from '../../shared/model/usuario';
import {Cliente} from '../../shared/model/cliente';
import {PrestadorServico} from '../../shared/model/prestador-servico';


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

  cadastrarServico(servico: Servico): void {
    servico.id = this.gerarId(); // Atribui um ID único
    this.servicos.push(servico)
  }

  getServicos(): Servico[] {
    return this.servicos;
  }

  getServicosPorCategoria(categoria: string = ''): Servico[] {
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
