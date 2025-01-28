import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaPrestadorComponent } from './agenda-prestador/agenda-prestador.component';
import { AvaliacaoUsuarioComponent } from './avaliacao-usuario/avaliacao-usuario.component';
import { CadastroServicoComponent } from '../servico/cadastro-servico/cadastro-servico.component';
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';

@NgModule({
  declarations: [
    AgendaPrestadorComponent,
    AvaliacaoUsuarioComponent,
    CadastroServicoComponent,
    LoginUsuarioComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AgendaPrestadorComponent,
    AvaliacaoUsuarioComponent,
    CadastroServicoComponent,
    LoginUsuarioComponent
  ]
})
export class UsuarioModule { }
