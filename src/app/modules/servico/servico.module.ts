import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendamentoServicoComponent } from './agendamento-servico/agendamento-servico.component';
import { CadastroServicoComponent } from './cadastro-servico/cadastro-servico.component';
import { CardServicoComponent } from './card-servico/card-servico.component';
import { ListagemServicosComponent } from './listagem-servicos/listagem-servicos.component';

@NgModule({
  declarations: [
    AgendamentoServicoComponent,
    CadastroServicoComponent,
    CardServicoComponent,
    ListagemServicosComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AgendamentoServicoComponent,
    CadastroServicoComponent,
    CardServicoComponent,
    ListagemServicosComponent
  ]
})
export class ServicoModule { }
