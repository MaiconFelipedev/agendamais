import { Usuario } from './usuario';
import { Servico } from './servico';
import { Agendamento } from './agendamento';
import { AgendaMes } from './agenda-mes';
import { DiaDeTrabalho } from './dia-trabalho';
import {DiasDaSemana} from './dias-da-semana.enum';

export class PrestadorServico extends Usuario {
    categoria: string;
    listaServicos: Servico[];

    constructor(nome: string, email: string, senha: string, telefone: string, endereco: string, tipo: string, categoria: string) {
        super(nome, email, senha, telefone, endereco, tipo);
        this.categoria = categoria;
        this.listaServicos = [];
    }

    // cadastrarServico(nome: string, descricao: string, preco: number, duracao: number): Servico {
    //     const servico = new Servico(0, nome, descricao, preco, duracao, this);
    //     this.listaServicos.push(servico);
    //     return servico;
    // }

    definirAgendaMes(dataReferencia: string, diasDeFolga: DiasDaSemana[], horarioIntervalo: String[]): AgendaMes {
      let agenda: AgendaMes = new AgendaMes(dataReferencia);
      agenda.gerarDiasDeTrabalho(diasDeFolga, horarioIntervalo);
      return agenda;
    }

    editarDiaDeTrabalho(diaDeTrabalho: DiaDeTrabalho, novoStatus: String, novoHorarioIntervalo: String[]): void {
      if(novoStatus != ""){
        diaDeTrabalho.editarStatus(novoStatus);
      }
      if(novoHorarioIntervalo.length > 0){
        diaDeTrabalho.editarIntervalo(novoHorarioIntervalo);
      }
    }

    confirmarAgendamento(agendamento: Agendamento): void {
        agendamento.status = 'confirmado';
    }
}
