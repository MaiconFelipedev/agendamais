import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { Servico } from '../../../shared/model/servico';
import { FormsModule } from '@angular/forms';
import { CardServicoComponent } from '../card-servico/card-servico.component';
import { ServicoService } from '../servico.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-listagem-servicos',
  templateUrl: './listagem-servicos.component.html',
  styleUrl: './listagem-servicos.component.scss',
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
  servicos: Servico[] = [];
  busca: string = '';
  tipo: string = '';
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
    this.servicoService.getServicosPorCategoria(this.tipo).subscribe(servicos => {
      console.log("Atualizei os serviços");

      // Ordena garantindo que prestador e verificado existam
      this.servicos = servicos
        .slice() // Cria uma cópia para garantir que a mudança seja detectada
        .sort((a, b) => {
          const verificadoA = a.prestador?.verificado ? 1 : 0;
          const verificadoB = b.prestador?.verificado ? 1 : 0;
          return verificadoB - verificadoA; // Ordena colocando os verificados primeiro
        });

      console.log('Serviços carregados:', this.servicos);
    });
  }

}
