export enum DiasPorMes {
  Janeiro = 31,
  Fevereiro = 28,
  Marco = 31,
  Abril = 30,
  Maio = 31,
  Junho = 30,
  Julho = 31,
  Agosto = 31,
  Setembro = 30,
  Outubro = 31,
  Novembro = 30,
  Dezembro = 31
}

export function obterDiasDoMes(mes: DiasPorMes, ano: number): number {
  if (mes === DiasPorMes.Fevereiro) {
    const ehBissexto = (ano % 4 === 0 && ano % 100 !== 0) || ano % 400 === 0;
    return ehBissexto ? 29 : 28;
  }
  return mes;
}
