abstract class Avaliacao {
  constructor(
    private id: number,
    public agendamento: Agendamento,
    public nota: number,
    public data: Date
  ) {}

  abstract avaliar(usuario: Usuario): void;
}
