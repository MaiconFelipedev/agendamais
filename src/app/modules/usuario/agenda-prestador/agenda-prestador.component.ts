import { Component } from '@angular/core';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {MaterialModule} from '../../material/material.module';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {addDays, parse, isBefore, format} from "date-fns";
import {AgendaService} from '../agenda.service';
import {UsuarioService} from '../usuario.service';
import {PrestadorServico} from '../../../shared/model/prestador-servico';
import {Title} from '@angular/platform-browser';
import {Agenda} from '../../../shared/model/agenda';
import moment from 'moment';
import 'moment/locale/pt-br';

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
export class AgendaPrestadorComponent {
  title = 'Agenda+ | Minha agenda';

  constructor(
    private titleService: Title,
    protected agendaService: AgendaService,
    protected usuarioService: UsuarioService
  ) {
    this.titleService.setTitle(this.title);
  }

  // dados exibiçao formulario
  diasDaSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
  folgasSelecionadas = new FormControl<string[]>([]);
  //

  // dados para salvar agenda
  folgas: number[] = [];
  ngOnInit() {
    this.folgasSelecionadas.valueChanges.subscribe(valoresSelecionados => {
      this.folgas = (valoresSelecionados ?? []).map(dia => this.diasDaSemana.indexOf(dia));
    });
  }
  dataInicial = moment();
  dataFinal = addDays(this.dataInicial.toDate(), 6);
  inicioExpediente = "00:00"
  terminoExpediente = "00:00"
  inicioIntervalo = "00:00";
  terminoIntervalo = "00:00";
  //

  salvarAgenda(){
    // const prestador = this.usuarioService.usuarioLogado() as PrestadorServico;
    //
    // // exibir exceção com modal
    // if(prestador){
    //   if(this.horaCerta()){
    //     const agendaGerada = prestador.definirAgenda([this.dataInicial.toDate(),this.dataFinal], this.folgas, [this.inicioIntervalo, this.terminoIntervalo], [this.inicioExpediente, this.terminoExpediente]);
    //     agendaGerada.idPrestador = prestador.id;
    //     this.agendaService.salvarAgenda(agendaGerada);
    //   } else {
    //     console.log("a hora inicial deve ser anterior à hora final")
    //   }
    //
    // } else {
    //   console.log("falta logar");
    // }
  }

  horaCerta(): boolean{
    const hora1 = parse(`${this.inicioIntervalo}`, "HH:mm", new Date());
    const hora2 = parse(`${this.terminoIntervalo}`, "HH:mm", new Date());

    return isBefore(hora1, hora2);
  }

  protected readonly format = format;
}
