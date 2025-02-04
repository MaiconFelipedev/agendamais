import {Component} from '@angular/core';
import {MaterialModule} from '../../material/material.module';
import {CommonModule} from '@angular/common';
import {Title} from '@angular/platform-browser';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ServicoService} from '../servico.service';
import {Servico} from '../../../shared/model/servico';
import {PrestadorServico} from '../../../shared/model/prestador-servico';
import {UsuarioService} from '../../usuario/usuario.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cadastro-servico',
  templateUrl: './cadastro-servico.component.html',
  styleUrl: './cadastro-servico.component.scss',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule]
})
export class CadastroServicoComponent {
  title = 'Agenda+ | Novo serviço';
  servicoForm: FormGroup;

  constructor(
    private titleService: Title,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private servicoService: ServicoService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.titleService.setTitle(this.title);
    this.servicoForm = this.fb.group({
      nome: ['', Validators.required],
      tipo: ['', Validators.required],
      valor: ['0.00', Validators.required],
      duracao: ['00:00', Validators.required],
      descricao: ['']
    });
  }
  onSubmit(): void {
    if (this.servicoForm.valid) {
      const {nome, tipo, valor, duracao, descricao} = this.servicoForm.value;
      const prestador = this.usuarioService.usuarioLogado() as PrestadorServico;

      const novoServico = new Servico(nome, tipo, valor, duracao, descricao, prestador);
      this.servicoService.cadastrarServico(novoServico);
    }

    this.router.navigate(['/agenda-prestador']).then(r => this.snackBar.open('Serviço criado com sucesso', 'Fechar', {
      duration: 3000
    }));
  }
}
