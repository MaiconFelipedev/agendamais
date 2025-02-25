import {Component, OnInit} from '@angular/core';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {MaterialModule} from '../../material/material.module';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {addDays, parse, isBefore, format} from "date-fns";
import {UsuarioService} from '../usuario.service';
import {Title} from '@angular/platform-browser';
import 'moment/locale/pt-br';
import {Usuario} from '../../../shared/model/usuario';
import {Agendamento} from '../../../shared/model/agendamento';
import {AgendamentoService} from '../../agendamento/agendamento.service';

@Component({
  selector: 'app-agenda-prestador',
  templateUrl: './agenda-prestador.component.html',
  styleUrl: './agenda-prestador.component.scss',
  standalone: true,
  imports: [MaterialModule, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-br'},
    provideMomentDateAdapter()
  ]
})
export class AgendaPrestadorComponent implements OnInit{
  title = 'Agenda+ | Minha agenda';
  prestador: Usuario | undefined;
  agendamentosPrestador: Agendamento[] = [];

  constructor(
    private titleService: Title,
    protected usuarioService: UsuarioService,
    protected agendamentoService: AgendamentoService
  ) {
    this.titleService.setTitle(this.title);
  }

  ngOnInit(): void {
    this.prestador = this.usuarioService.usuarioLogado();
    if(this.prestador != undefined){
      this.buscarAgendamentos(this.prestador.id);
    }
  }

  dataInicialAgenda: Date = new Date();
  dataFinalAgenda: Date = addDays(this.dataInicialAgenda, 6);
  datasCalendario: string[] = this.gerarDatasExibicao();

  buscarAgendamentos(prestadorId: string | undefined){
    this.agendamentoService.buscarPorPrestador(prestadorId).subscribe({
      next: resposta => {
        this.agendamentosPrestador = resposta;
      },
      error: erro => {
        console.log("Deu erro no buscarPorPrestador")
      }
    });
  }

  buscarPorData(data: string): Agendamento[]{
    let agendamentosDia: Agendamento[] = [];

    this.agendamentosPrestador.forEach(agendamento => {
      if(agendamento.data === data){
        agendamentosDia.push(agendamento);
      }
    })

    return agendamentosDia;
  }

  gerarDatasExibicao(): string[] {
    const datas: string[] = [];
    let dataAtual = this.dataInicialAgenda;

    while (dataAtual <= this.dataFinalAgenda) {
      datas.push(format(dataAtual, "dd/MM/yyyy"));
      dataAtual = addDays(dataAtual, 1);
    }
    return datas;
  }

  exibirDataInicial(): string{
    return format(this.dataInicialAgenda, "dd/MM/yyyy");
  }

  exibirDataFinal(): string{
    return format(this.dataFinalAgenda, "dd/MM/yyyy");
  }

  // // dados exibiçao formulario
  // diasDaSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
  // folgasSelecionadas = new FormControl<string[]>([]);
  // //
  //
  // // dados para salvar agenda
  // folgas: number[] = [];
  // ngOnInit() {
  //   this.folgasSelecionadas.valueChanges.subscribe(valoresSelecionados => {
  //     this.folgas = (valoresSelecionados ?? []).map(dia => this.diasDaSemana.indexOf(dia));
  //   });
  // }
  // dataInicial = moment();
  // dataFinal = addDays(this.dataInicial.toDate(), 6);
  // inicioExpediente = "00:00"
  // terminoExpediente = "00:00"
  // inicioIntervalo = "00:00";
  // terminoIntervalo = "00:00";
  // //
  //
  // salvarAgenda(){
  //   // const prestador = this.usuarioService.usuarioLogado() as PrestadorServico;
  //   //
  //   // // exibir exceção com modal
  //   // if(prestador){
  //   //   if(this.horaCerta()){
  //   //     const agendaGerada = prestador.definirAgenda([this.dataInicial.toDate(),this.dataFinal], this.folgas, [this.inicioIntervalo, this.terminoIntervalo], [this.inicioExpediente, this.terminoExpediente]);
  //   //     agendaGerada.idPrestador = prestador.id;
  //   //     this.agendaService.salvarAgenda(agendaGerada);
  //   //   } else {
  //   //     console.log("a hora inicial deve ser anterior à hora final")
  //   //   }
  //   //
  //   // } else {
  //   //   console.log("falta logar");
  //   // }
  // }
  //
  // horaCerta(): boolean{
  //   const hora1 = parse(`${this.inicioIntervalo}`, "HH:mm", new Date());
  //   const hora2 = parse(`${this.terminoIntervalo}`, "HH:mm", new Date());
  //
  //   return isBefore(hora1, hora2);
  // }
  //
  // protected readonly format = format;
}
