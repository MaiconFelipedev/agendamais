import {Component} from '@angular/core';
import {MaterialModule} from '../../material/material.module';
import {CommonModule} from '@angular/common';
import {Title} from '@angular/platform-browser';
import {UsuarioService} from '../../usuario/usuario.service';
import {AgendaService} from '../../usuario/agenda.service';
import {ServicoService} from '../../servico/servico.service';
import {Servico} from '../../../shared/model/servico';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Agenda} from '../../../shared/model/agenda';
import {Router} from '@angular/router';
import {Cliente} from '../../../shared/model/cliente';
import {addMinutes, format, parse} from 'date-fns';
import {Agendamento} from '../../../shared/model/agendamento';


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
  agendaPrestador: Agenda | undefined;
  private nextId = 1;

  constructor(
    private titleService: Title,
    private usuarioService: UsuarioService,
    protected agendaService: AgendaService,
    private servicoService: ServicoService,
    private router: Router
  ) {
    this.titleService.setTitle(this.title);
    this.agendaPrestador = agendaService.resgatarAgenda();
    this.servicoSelecionado = this.router.getCurrentNavigation()?.extras.state?.['servico'];
  }

  private gerarId(): number {
    return this.nextId++;
  }

  dataSelecionada = new FormControl<string>("");
  horarioInicioAtendimento = "00:00";

  agendar(){
    const duracao = this.converterDuracao(this.servicoSelecionado?.duracao!)
    const horarioTerminoAtendimento = addMinutes(parse(this.horarioInicioAtendimento, "HH:mm", new Date()), duracao);

    const dataAtendimento: Date = parse(`${this.dataSelecionada.value}`, "dd/MM/yyyy", new Date());

    const diaDeTrabalho = this.agendaPrestador?.diasDeTrabalho.filter(diaDeTrabalho => diaDeTrabalho.dataFormatada === this.dataSelecionada.value)[0]

    const agendamento = new Agendamento(dataAtendimento, [this.horarioInicioAtendimento, format(horarioTerminoAtendimento, "HH:mm")], this.usuarioService.usuarioLogado() as Cliente, this.servicoSelecionado!, this.servicoSelecionado?.preco!);
    agendamento.id = this.gerarId();

    console.log(diaDeTrabalho)
    diaDeTrabalho!.agendamentos.push(agendamento);

    this.router.navigate(['/listagem-servicos']);
  }

  converterDuracao(tempo: string): number {
    const [horas, minutos] = tempo.split(":").map(Number);
    return horas * 60 + minutos;
  }
}
