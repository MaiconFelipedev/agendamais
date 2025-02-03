import {Component} from '@angular/core';
import {MaterialModule} from '../../material/material.module';
import {CommonModule} from '@angular/common';
import {Servico} from '../../../shared/model/servico';
import {FormsModule} from '@angular/forms';
import {CardServicoComponent} from '../card-servico/card-servico.component';
import {ServicoService} from '../servico.service';
import {Title} from '@angular/platform-browser';


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
  categoria: string = '';
  categorias: string[] = [];

  constructor(private servicoService: ServicoService, private titleService: Title) {
    this.titleService.setTitle(this.title);
  }

  ngOnInit() {
    this.carregarCategorias();
    this.atualizarServicos();
  }
  carregarCategorias() {
    this.categorias = this.servicoService.gerarCategorias();
    console.log('Categorias carregadas:', this.categorias);
  }



  atualizarServicos(): void {
    let servicos = this.servicoService.getServicos(this.categoria);

    // Adicione um log para verificar os serviços recebidos
    console.log('Serviços carregados:', servicos);

    // Filtra os serviços com base no campo de busca
    if (this.busca.trim()) {
      servicos = servicos.filter((servico) =>
        servico.nome.toLowerCase().includes(this.busca.toLowerCase())
      );
    }

    this.servicos = servicos;
  }



  //atualizarServicos(): void {
    //this.servicoService.getServicos(this.categoria).subscribe((servicos: Servico[]) => {
      //this.servicos = servicos.filter((servico) =>
        //servico.nome.toLowerCase().includes(this.busca.toLowerCase())
      //);
    //});
  //}
  //protected readonly Servico = Servico;
}
