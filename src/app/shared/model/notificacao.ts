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
  enviar(): void {
    this._enviada = true;
    console.log(`Notificação enviada para ${this._destinatario.nome}: ${this._mensagem}`);
  }
}