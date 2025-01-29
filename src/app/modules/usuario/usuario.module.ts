import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaPrestadorComponent } from './agenda-prestador/agenda-prestador.component';
import { AvaliacaoUsuarioComponent } from './avaliacao-usuario/avaliacao-usuario.component';
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';
import {CadastroUsuarioComponent} from './cadastro-usuario/cadastro-usuario.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AgendaPrestadorComponent,
    AvaliacaoUsuarioComponent,
    CadastroUsuarioComponent,
    LoginUsuarioComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    AgendaPrestadorComponent,
    AvaliacaoUsuarioComponent,
    CadastroUsuarioComponent,
    LoginUsuarioComponent
  ]
})
export class UsuarioModule { }
