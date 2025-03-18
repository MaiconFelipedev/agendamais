import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { Servico } from '../../../shared/model/servico'; // Certifique-se de que esse tipo está correto
import { FormsModule } from '@angular/forms';
import { CardServicoComponent } from '../card-servico/card-servico.component';
import { ServicoService } from '../servico.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-listagem-servicos',
  templateUrl: './listagem-servicos.component.html',
  styleUrls: ['./listagem-servicos.component.scss'],  // Corrigido de styleUrl para styleUrls
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    CardServicoComponent
  ]
})
export class ListagemServicosComponent {
  title = 'Agenda+ | Lista de serviços';
  servicos: Servico[] = []; // Definindo corretamente o tipo de servicos
  servicosFiltrados: Servico[] = [];
  busca: string = '';
  tipo: string = '';
  cidadeFiltro: string = '';
  estadoFiltro: string = '';
  tipos: string[] = [];

  constructor(private servicoService: ServicoService, private titleService: Title) {
    this.titleService.setTitle(this.title);
  }

  ngOnInit() {
    this.carregarTipos();
    this.atualizarServicos();
  }

  carregarTipos() {
    this.servicoService.gerarTipos().subscribe(tipos => {
      this.tipos = tipos;
      console.log('Tipos carregados:', this.tipos);
    });
  }

  atualizarServicos(): void {
    // Garantir que a resposta do serviço é do tipo Servico[]
    this.servicoService.getServicos().subscribe((servicos: Servico[]) => {
      console.log("Atualizei os serviços");

      // Ordena garantindo que prestador e verificado existam
      this.servicos = servicos
        .slice() // Cria uma cópia para garantir que a mudança seja detectada
        .sort((a: Servico, b: Servico) => { // Especificando o tipo dos parâmetros a e b
          const verificadoA = a.prestador?.verificado ? 1 : 0;
          const verificadoB = b.prestador?.verificado ? 1 : 0;
          return verificadoB - verificadoA; // Ordena colocando os verificados primeiro
        });

      // Aplica os filtros após carregar os serviços
      this.filtrarServicos();
    });
  }

  filtrarServicos(): void {
    // Função auxiliar para remover acentos e transformar em minúsculas
    const removerAcentos = (texto: string) => 
      texto.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
  
    this.servicosFiltrados = this.servicos.filter(servico => {
      const cidadeFiltroLimpo = removerAcentos(this.cidadeFiltro);
      const estadoFiltroLimpo = removerAcentos(this.estadoFiltro);
  
      const cidadeValida = servico.endereco?.cidade 
        ? removerAcentos(servico.endereco.cidade).includes(cidadeFiltroLimpo) 
        : true;
  
      const estadoValido = servico.endereco?.estado 
        ? removerAcentos(servico.endereco.estado).includes(estadoFiltroLimpo) 
        : true;
  
      const tipoValido = this.tipo ? servico.tipo === this.tipo : true;
  
      return tipoValido && cidadeValida && estadoValido;
    });
  }
  
}