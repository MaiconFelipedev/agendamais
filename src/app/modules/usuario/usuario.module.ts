import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaPrestadorComponent } from './agenda-prestador/agenda-prestador.component';
import { AvaliacaoUsuarioComponent } from './avaliacao-usuario/avaliacao-usuario.component';
import {CadastroUsuarioComponent} from './cadastro-usuario/cadastro-usuario.component';
import {MaterialModule} from '../material/material.module';

@NgModule({
  declarations: [
    AgendaPrestadorComponent,
    AvaliacaoUsuarioComponent,
    CadastroUsuarioComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    AgendaPrestadorComponent,
    AvaliacaoUsuarioComponent,
    CadastroUsuarioComponent,
    MaterialModule
  ]
})
export class UsuarioModule { }
