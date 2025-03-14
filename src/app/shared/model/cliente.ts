import { Usuario } from './usuario';
import { Agendamento } from './agendamento';
//import { Filtros } from './Filtros'; // Define sua estrutura de filtros aqui.
import { Servico } from './servico';

export class Cliente extends Usuario {
    historicoAgendamentos: Agendamento[] = [];

  constructor(nome: string, email: string, senha: string, telefone: string, tipo: string,
              endereco: { rua: string; bairro: string; cidade: string; estado: string }, verificado: boolean, id?: string) {
    super(nome, email, senha, telefone, tipo, endereco, verificado, id);

    }

    buscarServicos(filtros: string): Servico[] {
        // Implementação fictícia
        return [];
    }

  // Método para converter o objeto em um formato simples
  toObject(): any {
    return {
      id: this.id,
      nome: this.nome,
      email: this.email,
      telefone: this.telefone,
      endereco: this.endereco
    };
  }

    // agendarServico(data: Date, horario: string[], servico: Servico): Agendamento {
    //     const agendamento = new Agendamento(data, horario, this, servico, servico.preco);
    //     agendamento.id = this.historicoAgendamentos[this.historicoAgendamentos.length - 1].id! + 1;
    //     this.historicoAgendamentos.push(agendamento);
    //     return agendamento;
    // }
}
