import { Component, OnInit } from '@angular/core';
import { Avaliacao } from '../../../shared/model/avaliacao';
import { AvaliacaoService } from '../avaliacao.service';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import {UsuarioService} from '../usuario.service';

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
  idPrestador: string | undefined

  constructor(
    private titleService: Title,
    private avaliacaoService: AvaliacaoService,
    protected usuarioService: UsuarioService,
  ) {
    this.titleService.setTitle(this.title);
    this.idPrestador = usuarioService.usuarioLogado()?.id;
  }

  ngOnInit(): void {
    this.avaliacaoService.getAvaliacoesPorPrestador(this.idPrestador!).subscribe({
      next: (avaliacoes) => {
        this.avaliacoes = avaliacoes;
      },
      error: (err) => {
        console.error('Erro ao carregar avaliações', err);
      }
    });

    this.avaliacaoService.getMediaNotasPorPrestador(this.idPrestador!).subscribe({
      next: (resultado) => {
        this.avaliacaoMedia = resultado;
      },
      error: (err) => {
        console.error('Erro ao carregar avaliação média', err);
      }
    });
  }
}
