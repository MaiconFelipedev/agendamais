import { Usuario } from './usuario';
import { Servico } from './servico';
import { Agendamento } from './agendamento';
import { Agenda } from './agenda';
import { DiaDeTrabalho } from './dia-trabalho';

export class PrestadorServico extends Usuario {

  constructor(
    nome: string,
    email: string,
    senha: string,
    telefone: string,
    tipo: string,
    endereco: { rua: string; bairro: string; cidade: string; estado: string }, id?: string) {
    super(nome, email, senha, telefone, tipo, endereco, id);
    }
}
