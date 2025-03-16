import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { UsuarioService } from '../usuario.service';
import { AgendamentoService } from '../../agendamento/agendamento.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Agendamento } from '../../../shared/model/agendamento';
import {Usuario} from '../../../shared/model/usuario';

@Component({
  selector: 'app-solicitacoes-prestador',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './solicitacoes-prestador.component.html',
  styleUrl: './solicitacoes-prestador.component.scss'
})
export class SolicitacoesPrestadorComponent implements OnInit {
  title = 'Agenda+ | Solicitações';
  prestador: Usuario | undefined;
  agendamentosPrestador: Agendamento[] | undefined;
  servicosOferecidos: string[] = [];

  constructor(
    private titleService: Title,
    protected usuarioService: UsuarioService,
    protected agendamentoService: AgendamentoService,
    private snackBar: MatSnackBar
  ) {
    this.titleService.setTitle(this.title);
  }

  ngOnInit(): void {
    this.prestador = this.usuarioService.usuarioLogado();
    if (this.prestador != undefined) {
      this.buscarAgendamentos(this.prestador.id);
    }
  }

  buscarAgendamentos(prestadorId: string | undefined) {
    this.agendamentoService.buscarPorPrestador(prestadorId).subscribe({
      next: resposta => {
        this.agendamentosPrestador = resposta;
        this.servicosOferecidos = this.buscarServicosOferecidos();
      },
      error: erro => {
        console.log("Deu erro no buscarPorPrestador");
      }
    });
  }

  buscarPorServico(nomeServico: string, status: string): Agendamento[] {
    let agendamentosTipoServico: Agendamento[] = [];

    if (this.agendamentosPrestador != undefined) {
      this.agendamentosPrestador.forEach(agendamento => {
        if (agendamento.servico.tipo === nomeServico && agendamento.status === status) {
          agendamentosTipoServico.push(agendamento);
        }
      });
    }

    return agendamentosTipoServico;
  }

  buscarPorStatus(status: string): Agendamento[] {
    let agendamentosFiltrados: Agendamento[] = [];

    if (this.agendamentosPrestador != undefined) {
      this.agendamentosPrestador.forEach(agendamento => {
        if (agendamento.status === status &&
          (agendamento.formaPagamento === 'Pix' || agendamento.formaPagamento === 'Cartão de Crédito')) {
          agendamentosFiltrados.push(agendamento);
        }
      });
    }

    return agendamentosFiltrados;
  }

  buscarServicosOferecidos(): string[] {
    let servicosOferecidos: string[] = [];

    if (this.agendamentosPrestador != undefined) {
      for (const agendamento of this.agendamentosPrestador) {
        if (servicosOferecidos.includes(agendamento.servico.tipo)) {
          continue;
        }
        if (agendamento.status === "Solicitado") {
          servicosOferecidos.push(agendamento.servico.tipo);
        }
      }
    }

    return servicosOferecidos;
  }

  remarcar(agendamento: Agendamento) {
    agendamento.recusar();
    this.agendamentoService.atualizar(agendamento).subscribe({
      next: resposta => {
        this.snackBar.open("Solicitação retornada! O cliente remarcará o horário.", "Fechar");
      }
    });
    this.buscarAgendamentos(this.prestador!.id);
  }

  aceitar(agendamento: Agendamento) {
    agendamento.aceitar();
    this.agendamentoService.atualizar(agendamento).subscribe({
      next: resposta => {
        this.snackBar.open("Serviço aceito! Aguarde o cliente realizar o pagamento.");
      }
    });
    this.buscarAgendamentos(this.prestador!.id);
  }

  confirmar(agendamento: Agendamento) {
    agendamento.confirmar();
    this.agendamentoService.atualizar(agendamento).subscribe({
      next: resposta => {
        this.snackBar.open("Serviço agendado! Visualize na sua agenda.");
      }
    });
    this.buscarAgendamentos(this.prestador!.id);
  }

  cancelar(agendamento: Agendamento) {
    agendamento.cancelar();
    this.agendamentoService.atualizar(agendamento).subscribe({
      next: resposta => {
        this.snackBar.open("Serviço cancelado!");
      }
    });
    this.buscarAgendamentos(this.prestador!.id);
  }
}
