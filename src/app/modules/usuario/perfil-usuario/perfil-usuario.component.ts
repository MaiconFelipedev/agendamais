import {Component, input, OnInit} from '@angular/core';
import { Avaliacao } from '../../../shared/model/avaliacao';
import { AvaliacaoService } from '../avaliacao.service';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import {UsuarioService} from '../usuario.service';
import {Agendamento} from '../../../shared/model/agendamento';
import {FormsModule} from '@angular/forms';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss'],
  standalone: true,
  imports: [MaterialModule, CommonModule, FormsModule, MatRadioGroup, MatRadioButton]
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
    private snackBar: MatSnackBar
  ) {
    this.titleService.setTitle(this.title);
    this.idUsuario = usuarioService.usuarioLogado()?.id;
  }

  comentario = "";
  notaEscolhida = 0;

  salvarAvaliacao(servico: Agendamento, comentario: string, nota: number) {
    const novaAvaliacao: Avaliacao = new Avaliacao(
      comentario,
      servico.data,
      servico.servico.prestador?.id!,
      nota
    );

    this.avaliacaoService.salvarAvaliacao(novaAvaliacao).subscribe({
      next: avaliacaoSalva => {
        if (avaliacaoSalva) {
          this.snackBar.open('Avaliação salva com sucesso', 'Fechar', {
            duration: 5000,
            panelClass: ['snackbar-error']
          });
        }
      },
      error: erro => {
        console.error('Erro ao salvar avaliação:', erro);
      }
    })
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

  protected readonly input = input;
}
