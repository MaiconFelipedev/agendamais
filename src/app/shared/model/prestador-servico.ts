import { Usuario } from './usuario';
import { Servico } from './servico';
import { Agendamento } from './agendamento';
import { Agenda } from './agenda';
import { DiaDeTrabalho } from './dia-trabalho';

export class PrestadorServico extends Usuario {
    listaServicos: Servico[];

  constructor(nome: string, email: string, senha: string, telefone: string, tipo: string,
              endereco: { rua: string; bairro: string; cidade: string; estado: string }, id?: string) {
    super(nome, email, senha, telefone, tipo, endereco, id);
        this.listaServicos = [];
    }

    // cadastrarServico(nome: string, descricao: string, preco: number, duracao: number): Servico {
    //     const servico = new Servico(0, nome, descricao, preco, duracao, this);
    //     this.listaServicos.push(servico);
    //     return servico;
    // }

    definirAgenda(periodo: Date[], diasDeFolga: number[], horarioIntervalo: string[], horarioTrabalho: string[]): Agenda {
      let agenda: Agenda = new Agenda(periodo, horarioTrabalho);
      agenda.gerarDiasDeTrabalho(diasDeFolga, horarioIntervalo);
      return agenda;
    }

    editarDiaDeTrabalho(diaDeTrabalho: DiaDeTrabalho, novoStatus: string, novoIntervalo: string[]): void {
      if(novoStatus != ""){
        diaDeTrabalho.editarStatus(novoStatus);
      }
      if(novoIntervalo.length > 0){
        diaDeTrabalho.editarIntervalo(novoIntervalo);
      }
    }

    confirmarAgendamento(agendamento: Agendamento): void {
        agendamento.status = "Confirmado";
    }
}
