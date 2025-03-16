import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { UsuarioService } from '../../usuario/usuario.service';
import { ServicoService } from '../../servico/servico.service';
import { Servico } from '../../../shared/model/servico';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from '../../../shared/model/cliente';
import { addMinutes, format, parse } from 'date-fns';
import { Agendamento } from '../../../shared/model/agendamento';
import { AgendamentoService } from '../agendamento.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agendamento-servico',
  templateUrl: './agendamento-servico.component.html',
  styleUrl: './agendamento-servico.component.scss',
  standalone: true,
  imports: [MaterialModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class AgendamentoServicoComponent {
  title = 'Agenda+ | Novo agendamento';
  servicoSelecionado: Servico | undefined;
  datasDisponiveis: string[] = [];
  horariosDisponiveis: { horario: string, disponivel: boolean }[] = [];
  horarioInicioAtendimento = "00:00";
  formaPagamentoSelecionada: string | undefined;

  constructor(
    private titleService: Title,
    private usuarioService: UsuarioService,
    private servicoService: ServicoService,
    private router: Router,
    private snackBar: MatSnackBar,
    private agendamentoService: AgendamentoService
  ) {
    this.titleService.setTitle(this.title);
    this.servicoSelecionado = this.router.getCurrentNavigation()?.extras.state?.['servico'];
    this.gerarDatasDisponiveis();
  }

  private gerarDatasDisponiveis(): void {
    const hoje = new Date();
    for (let i = 0; i < 7; i++) {
      const data = new Date(hoje);
      data.setDate(hoje.getDate() + i);
      this.datasDisponiveis.push(format(data, 'dd/MM/yyyy'));
    }
  }

  dataSelecionada = new FormControl<string>("");

  carregarHorariosDisponiveis(): void {
    // Verifica se o serviço e o prestador estão definidos
    if (!this.servicoSelecionado || !this.servicoSelecionado.prestador || !this.servicoSelecionado.prestador.id) {
      this.snackBar.open('Serviço ou prestador não definido.', 'Fechar', { duration: 5000 });
      return;
    }

    if (!this.dataSelecionada.value) {
      this.snackBar.open('Selecione uma data.', 'Fechar', { duration: 5000 });
      return;
    }

    // Limpa a lista de horários
    this.horariosDisponiveis = [];

    // Define o horário de início e fim do dia
    const inicioDia = parse('08:00', 'HH:mm', new Date());
    const fimDia = parse('18:00', 'HH:mm', new Date());

    // Gera os horários de 30 em 30 minutos
    let horarioAtual = inicioDia;
    while (horarioAtual <= fimDia) {
      const horarioFormatado = format(horarioAtual, 'HH:mm');
      this.horariosDisponiveis.push({ horario: horarioFormatado, disponivel: true });
      horarioAtual = addMinutes(horarioAtual, 30);
    }

    // Verifica os horários ocupados
    this.agendamentoService.buscarAgendamentosPorDataEPrestador(
      this.dataSelecionada.value,
      this.servicoSelecionado.prestador.id
    ).subscribe({
      next: (agendamentos) => {
        agendamentos.forEach((agendamento) => {
          const horarioAgendado = format(agendamento.horarioInicial, 'HH:mm');
          const index = this.horariosDisponiveis.findIndex((h) => h.horario === horarioAgendado);
          if (index !== -1) {
            this.horariosDisponiveis[index].disponivel = false;
          }
        });
      },
      error: (erro) => {
        this.snackBar.open('Erro ao carregar horários.', 'Fechar', { duration: 5000 });
        console.error(erro);
      }
    });
  }

  agendar(): void {
    if (!this.horarioInicioAtendimento || !this.dataSelecionada.value || !this.formaPagamentoSelecionada) {
      this.snackBar.open('Preencha todos os campos obrigatórios.', 'Fechar', { duration: 5000 });
      return;
    }

    const duracao = this.converterDuracao(this.servicoSelecionado?.duracao!);
    const dataComHorario = parse(
      `${this.dataSelecionada.value} ${this.horarioInicioAtendimento}`,
      'dd/MM/yyyy HH:mm',
      new Date()
    );
    const horarioTerminoAtendimento = addMinutes(dataComHorario, duracao);

    const agendamento = new Agendamento(
      dataComHorario,
      horarioTerminoAtendimento,
      this.usuarioService.usuarioLogado() as Cliente,
      this.servicoSelecionado!,
      this.servicoSelecionado?.preco!,
      "Solicitado",
      this.formaPagamentoSelecionada
    );

    this.agendamentoService.agendarComVerificacao(agendamento).subscribe({
      next: (resultado) => {
        if (typeof resultado === 'string') {
          this.snackBar.open(resultado, 'Fechar', { duration: 5000 });
        } else {
          this.snackBar.open('✅ Agendamento solicitado com sucesso!', 'Fechar', { duration: 5000 });
          this.router.navigate(['/listagem-servicos']);
        }
      },
      error: (erro) => {
        this.snackBar.open('Erro ao agendar.', 'Fechar', { duration: 5000 });
        console.error(erro);
      }
    });
  }

  converterDuracao(tempo: string): number {
    const [horas, minutos] = tempo.split(":").map(Number);
    return horas * 60 + minutos;
  }
}
