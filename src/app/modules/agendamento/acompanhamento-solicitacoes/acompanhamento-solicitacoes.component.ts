import {Component, inject, OnInit} from '@angular/core';
import { AgendamentoService } from '../../agendamento/agendamento.service';
import { Agendamento } from '../../../shared/model/agendamento';
import { UsuarioService } from '../../usuario/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-acompanhamento-solicitacoes',
  templateUrl: './acompanhamento-solicitacoes.component.html',
  styleUrls: ['./acompanhamento-solicitacoes.component.scss'],
  standalone: true,
  imports: [MaterialModule, CommonModule, FormsModule, ReactiveFormsModule, MatStepperModule]
})
export class AcompanhamentoSolicitacoesComponent implements OnInit {
  agendamentos: Agendamento[] = [];
  modalAberto: boolean = false; // Controla a visibilidade do modal
  agendamentoSelecionado: Agendamento | null = null; // Armazena o agendamento selecionado

  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  fortyFormGroup = this._formBuilder.group({
    fortyCtrl: ['', Validators.required],
  });
  isLinear = false;

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
      case 'Pagamento Pendente':
        return 'amarelo';
      case 'Confirmado':
        return 'verde';
      case 'Recusado':
        return 'vermelho';
      default:
        return 'cinza';
    }
  }

  // Abre o modal de pagamento
  abrirModalPagamento(agendamento: Agendamento): void {
    this.agendamentoSelecionado = agendamento;
    this.modalAberto = true;
  }

  // Fecha o modal de pagamento
  fecharModal(): void {
    this.modalAberto = false;
    this.agendamentoSelecionado = null;
  }
}
