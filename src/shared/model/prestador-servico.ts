import { Usuario } from './usuario';
import { Servico } from './servico';
import { Agendamento } from './agendamento';
import { AgendaMes } from './agenda-mes';
import { DiaDeTrabalho } from './dia-trabalho';
// Classe PrestadorServico
class PrestadorServico extends Usuario {
    categoria: string;
    listaServicos: Servico[];

    constructor(id: number, nome: string, email: string, senha: string, telefone: string, endereco: string, tipo: string, categoria: string) {
        super(id, nome, email, senha, telefone, endereco, tipo);
        this.categoria = categoria;
        this.listaServicos = [];
    }

    cadastrarServico(nome: string, descricao: string, preco: number, duracao: number): Servico {
        const servico = new Servico(0, nome, descricao, preco, duracao, this);
        this.listaServicos.push(servico);
        return servico;
    }

    definirAgendaMes(dataReferencia: Date): AgendaMes {
        return new AgendaMes(0, dataReferencia, []);
    }

    editarAgendaMes(agenda: AgendaMes, novosDiasDeTrabalho: DiaDeTrabalho[]): AgendaMes {
        agenda.diasDeTrabalho = novosDiasDeTrabalho;
        const diasValidos = novosDiasDeTrabalho.every((dia) => {
            return dia.data.getMonth() + 1 === agenda.dataReferencia.month; // Verifica se o mês bate
        });
        if (!diasValidos) {
            throw new Error('Um ou mais dias estão fora do mês da agenda!');
        }
        return agenda;
    }

    confirmarAgendamento(agendamento: Agendamento): void {
        agendamento.status = 'confirmado';
    }
}
