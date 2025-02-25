import { Component, OnInit } from '@angular/core';
import { AgendamentoService } from '../../agendamento/agendamento.service';
import {Agendamento} from '../../../shared/model/agendamento';
import { UsuarioService } from '../../usuario/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../material/material.module';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CardServicoComponent} from '../../servico/card-servico/card-servico.component';

@Component({
  selector: 'app-acompanhamento-solicitacoes',
  templateUrl: './acompanhamento-solicitacoes.component.html',
  styleUrls: ['./acompanhamento-solicitacoes.component.scss'],
  standalone: true,
  imports: [MaterialModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class AcompanhamentoSolicitacoesComponent implements OnInit {
  agendamentos: Agendamento[] = [];

  constructor(
    private agendamentoService: AgendamentoService,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.carregarAgendamentos();
  }

  carregarAgendamentos(): void {
    const cliente = this.usuarioService.usuarioLogado();
    if (cliente && cliente.tipo === 'cliente') {
      this.agendamentoService.buscarPorCliente(cliente.id!).subscribe({
        next: (agendamentos) => {
          this.agendamentos = agendamentos;
        },
        error: () => {
          this.snackBar.open('Erro ao carregar agendamentos.', 'Fechar', {
            duration: 5000,
            panelClass: ['snackbar-error']
          });
        }
      });
    }
  }

  getCorCard(status: string): string {
    switch (status) {
      case 'Solicitado':
        return 'azul';
      case 'Confirmado':
        return 'verde';
      case 'Recusado':
        return 'vermelho';
      default:
        return 'cinza';
    }
  }
}
