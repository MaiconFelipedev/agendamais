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
import { AgendamentoService } from '../../agendamento/agendamento.service';
import {MatSnackBar} from '@angular/material/snack-bar';

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
  horarioInicioAtendimento = "00:00";

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

  agendar() {
    const duracao = this.converterDuracao(this.servicoSelecionado?.duracao!);
    const horarioTerminoAtendimento = addMinutes(parse(this.horarioInicioAtendimento, "HH:mm", new Date()), duracao);

    const dataAtendimento: Date = parse(`${this.dataSelecionada.value}`, "dd/MM/yyyy", new Date());

    const agendamento = new Agendamento(
      dataAtendimento,
      horarioTerminoAtendimento,
      this.usuarioService.usuarioLogado() as Cliente,
      this.servicoSelecionado!,
      this.servicoSelecionado?.preco!
    );

    this.agendamentoService.agendarComVerificacao(agendamento).subscribe(
      (resultado) => {
        if (typeof resultado === 'string') {
          this.snackBar.open(resultado, 'Fechar', {
            duration: 5000,
            panelClass: ['snackbar-error']
          });
        } else {
          this.router.navigate(['/cadastro-servico']); // Redireciona após sucesso
        }
      }
    );
  }

  converterDuracao(tempo: string): number {
    const [horas, minutos] = tempo.split(":").map(Number);
    return horas * 60 + minutos;
  }
}
