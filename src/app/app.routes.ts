import { Routes } from '@angular/router';
import { AgendaPrestadorComponent } from './modules/usuario/agenda-prestador/agenda-prestador.component';
import { AvaliacaoUsuarioComponent } from './modules/usuario/avaliacao-usuario/avaliacao-usuario.component';
import { CadastroUsuarioComponent } from './modules/usuario/cadastro-usuario/cadastro-usuario.component';
import { LoginUsuarioComponent } from './modules/usuario/login-usuario/login-usuario.component';
import { AgendamentoServicoComponent } from './modules/agendamento/agendamento-servico/agendamento-servico.component';
import { CadastroServicoComponent } from './modules/servico/cadastro-servico/cadastro-servico.component';
import { CardServicoComponent } from './modules/servico/card-servico/card-servico.component';
import { ListagemServicosComponent } from './modules/servico/listagem-servicos/listagem-servicos.component';

export const routes: Routes = [
  {
    path: 'agenda-prestador',
    component: AgendaPrestadorComponent
  },
  {
    path: 'avaliacao-usuario',
    component: AvaliacaoUsuarioComponent
  },
  {
    path: 'cadastro-usuario',
    component: CadastroUsuarioComponent
  },
  {
    path: 'login-usuario',
    component: LoginUsuarioComponent
  },
  {
    path: 'agendamento-servico',
    component: AgendamentoServicoComponent
  },
  {
    path: 'cadastro-servico',
    component: CadastroServicoComponent
  },
  {
    path: 'card-servico',
    component: CardServicoComponent
  },
  {
    path: 'listagem-servicos',
    component: ListagemServicosComponent
  }
];
