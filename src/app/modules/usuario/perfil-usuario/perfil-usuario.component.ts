import { Component, OnInit } from '@angular/core';
import { Avaliacao } from '../../../shared/model/avaliacao';
import { AvaliacaoService } from '../avaliacao.service';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import {UsuarioService} from '../usuario.service';
import {Agendamento} from '../../../shared/model/agendamento';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss'],
  standalone: true,
  imports: [MaterialModule, CommonModule]
})
export class PerfilUsuarioComponent implements OnInit {
  title = 'Agenda+ | Avaliação';
  avaliacoes: Avaliacao[] = [];
  avaliacaoMedia: number | undefined;
  servicosConcluidos: Agendamento[] = [];
  idUsuario: string | undefined

  constructor(
    private titleService: Title,
    private avaliacaoService: AvaliacaoService,
    protected usuarioService: UsuarioService,
  ) {
    this.titleService.setTitle(this.title);
    this.idUsuario = usuarioService.usuarioLogado()?.id;
  }

  salvarAvaliacao() {
    const novaAvaliacao: Avaliacao = new Avaliacao(
      'Teste de comentário!',       // comentario
      '25/02/2025',           // data
      'QkD4h39taVDqne4LctLn', // idPrestador
      5                       // nota
    );

    this.avaliacaoService.salvarAvaliacao(novaAvaliacao).subscribe(
      (avaliacaoSalva) => {
        if (avaliacaoSalva) {
          console.log('Avaliação salva com sucesso!', avaliacaoSalva);
        } else {
          console.log('Falha ao salvar avaliação.');
        }
      },
      (error) => {
        console.error('Erro ao salvar avaliação:', error);
      }
    );
  }

  ngOnInit(): void {
    this.avaliacaoService.getAvaliacoesPorPrestador(this.idUsuario!).subscribe({
      next: (avaliacoes) => {
        this.avaliacoes = avaliacoes;
      },
      error: (err) => {
        console.error('Erro ao carregar avaliações', err);
      }
    });

    this.avaliacaoService.getMediaNotasPorPrestador(this.idUsuario!).subscribe({
      next: (resultado) => {
        this.avaliacaoMedia = resultado;
      },
      error: (err) => {
        console.error('Erro ao carregar avaliação média', err);
      }
    });

    this.avaliacaoService.getServicosConcluidosDoCliente(this.idUsuario!).subscribe({
      next: (servicos) => {
        this.servicosConcluidos = servicos;
        console.log(this.servicosConcluidos)
      },
      error: (err) => {
        console.error('Erro ao carregar serviços concluídos', err);
      }
    });


  }
}
