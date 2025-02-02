import { Usuario } from './usuario';

export class Notificacao {
  private _id: number;
  private _destinatario: Usuario;
  private _mensagem: string;
  // "alerta" "informacao"
  private _tipo: string;
  // Status da notificacao
  private _enviada: boolean = false;

  constructor(
    id: number,
    destinatario: Usuario,
    mensagem: string,
    tipo: string
  ) {
    this._id = id;
    this._destinatario = destinatario;
    this._mensagem = mensagem;
    this._tipo = tipo;
  }

  get id(): number {
    return this._id;
  }

  get destinatario(): Usuario {
    return this._destinatario;
  }

  get mensagem(): string {
    return this._mensagem;
  }

  get tipo(): string {
    return this._tipo;
  }

  get enviada(): boolean {
    return this._enviada;
  }

  // Marca a notificacao como enviada e imprime
  enviar(): boolean {
    if(this._enviada) {
        // Indica que não foi enviada novamente
        return false;
        // console.log('Notificação já foi enviada anteriormente.');
    }
    // Marca a notificacao como enviada
    this._enviada = true;
    // Indica que a notificação foi enviada com sucesso
    return this._enviada;
    // console.log(`Notificação enviada para ${this._destinatario.nome}: ${this._mensagem}`);
  }

  // Retorna a notificacao como uma mensagem
  obterNotificacao(): string {
    const status = this._enviada ? 'Enviada' : 'Pendente';
    return `Notificação para ${this._destinatario.nome}: ${this._mensagem}`;
  }
}