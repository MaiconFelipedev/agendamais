import { Usuario } from './usuario';
import { Agendamento } from './agendamento';
//import { Filtros } from './Filtros'; // Define sua estrutura de filtros aqui.
import { Servico } from './servico';

export class Cliente extends Usuario {
    historicoAgendamentos: Agendamento[] = [];

  constructor(nome: string, email: string, senha: string, telefone: string, tipo: string,
              endereco: { rua: string; bairro: string; cidade: string; estado: string }) {
    super(nome, email, senha, telefone, tipo, endereco);

    }

    buscarServicos(filtros: string): Servico[] {
        // Implementação fictícia
        return [];
    }

    // agendarServico(servico: Servico): Agendamento {
    //     const agendamento = new Agendamento(0, new Date(), new Date(), new Date(), this, servico, 0, 0, 'pendente');
    //     this.historicoAgendamentos.push(agendamento);
    //     return agendamento;
    // }
}
