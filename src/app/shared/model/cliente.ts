import { Usuario } from './usuario';
import { Agendamento } from './agendamento';
//import { Filtros } from './Filtros'; // Define sua estrutura de filtros aqui.
import { Servico } from './servico';

export class Cliente extends Usuario {
    historicoAgendamentos: Agendamento[];

    constructor(id: number, nome: string, email: string, senha: string, telefone: string, endereco: string, tipo: string) {
        super(id, nome, email, senha, telefone, endereco, tipo);
        this.historicoAgendamentos = [];
    }

    buscarServicos(filtros: string): Servico[] {
        // Implementação fictícia
        return [];
    }

    agendarServico(servico: Servico): Agendamento {
        const agendamento = new Agendamento(0, new Date(), new Date(), new Date(), this, servico, 0, 0, 'pendente');
        this.historicoAgendamentos.push(agendamento);
        return agendamento;
    }
}
