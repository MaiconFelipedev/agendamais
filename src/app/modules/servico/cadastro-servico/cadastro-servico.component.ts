import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServicoService } from '../servico.service';
import { Servico } from '../../../shared/model/servico';
import { PrestadorServico } from '../../../shared/model/prestador-servico';
import { UsuarioService } from '../../usuario/usuario.service';
import { Router } from '@angular/router';
import {MatCheckbox, MatCheckboxChange} from '@angular/material/checkbox';
import { Endereco } from '../../../shared/model/enderecoServico';

@Component({
  selector: 'app-cadastro-servico',
  templateUrl: './cadastro-servico.component.html',
  styleUrl: './cadastro-servico.component.scss',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule, MatCheckbox]
})
export class CadastroServicoComponent {
  title = 'Agenda+ | Novo serviço';
  servicoForm: FormGroup;
  formasPagamento: string[] = ['Pix', 'Cartão de Crédito', 'Dinheiro']; // Opções de pagamento
  enderecoUsuario: Endereco | null = null;
  usarEndereco: boolean = false;

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
      descricao: [''],
      formasPagamento: [[], Validators.required],
      endereco: this.fb.group({
        rua: ['', Validators.required],
        bairro: ['', Validators.required],
        cidade: ['', Validators.required],
        estado: ['', [Validators.required, Validators.maxLength(2)]],
      }),
    });
    console.log(this.servicoForm.value)
  }

  ngOnInit(): void {
    const usuario = this.usuarioService.usuarioLogado(); // Obtém usuário logado
  
    if (usuario && usuario.endereco) {
      this.enderecoUsuario = usuario.endereco; // Define o endereço se existir
    } else {
      this.enderecoUsuario = null; // Define um valor padrão
    }
    console.log(this.enderecoUsuario); // Verifique se o endereço está sendo carregado corretamente
  }
  
  
/*
  onSubmit(): void {
    if (this.servicoForm.valid) {
      const { nome, tipo, valor, duracao, descricao, endereco, formasPagamento } = this.servicoForm.value;
      const prestador = this.usuarioService.usuarioLogado() as PrestadorServico;

      const novoServico = new Servico(nome, tipo, valor, duracao, descricao, endereco, prestador, undefined, formasPagamento);
      this.servicoService.cadastrarServico(novoServico).subscribe(() => {
        this.router.navigate(['/agenda-prestador']).then(() => {
          this.snackBar.open('Serviço criado com sucesso', 'Fechar', {
            duration: 3000
          });
        });
      });
    }
  }
  */

  onSubmit(): void {
    if (this.servicoForm.valid) {
      const { nome, tipo, valor, duracao, descricao, endereco, formasPagamento } = this.servicoForm.value;
  
      // Cria uma variável nova para o endereço (não faz reatribuição de um "const")
      let enderecoFinal = endereco;
  
      // Verifica se o endereço foi preenchido corretamente
      if (!enderecoFinal || !enderecoFinal.rua || !enderecoFinal.bairro || !enderecoFinal.cidade || !enderecoFinal.estado) {
        // Se o endereço não foi preenchido no formulário, usa o endereço do servidor
        const enderecoDoServidor = this.enderecoUsuario; // Supondo que this.enderecoUsuario seja o endereço do servidor
  
        enderecoFinal = {
          rua: enderecoDoServidor!.rua,
          bairro: enderecoDoServidor!.bairro,
          cidade: enderecoDoServidor!.cidade,
          estado: enderecoDoServidor!.estado
        };
      }
  
      // Cria um novo serviço com o endereço correto
      const prestador = this.usuarioService.usuarioLogado() as PrestadorServico;
  
      const novoServico = new Servico(
        nome, tipo, valor, duracao, descricao,
        { ...enderecoFinal }, // Passa uma cópia do endereço
        prestador,
        undefined, // Se necessário, você pode passar um ID aqui
        formasPagamento
      );
  
      // Envia o serviço para ser cadastrado
      this.servicoService.cadastrarServico(novoServico).subscribe(() => {
        this.router.navigate(['/agenda-prestador']).then(() => {
          this.snackBar.open('Serviço criado com sucesso', 'Fechar', {
            duration: 3000
          });
        });
      });
    } else {
      // Se o formulário não for válido
      this.snackBar.open("Por favor, preencha todos os campos corretamente.", "Fechar", {
        duration: 3000
      });
    }
  }
  
  onCheckboxChange(event: MatCheckboxChange, forma: string): void {
    const formasPagamento = this.servicoForm.get('formasPagamento')?.value as string[];

    if (event.checked) {
      // Adiciona a forma de pagamento selecionada
      formasPagamento.push(forma);
    } else {
      // Remove a forma de pagamento desmarcada
      const index = formasPagamento.indexOf(forma);
      if (index >= 0) {
        formasPagamento.splice(index, 1);
      }
    }
    // Atualiza o valor do campo no formulário
    this.servicoForm.get('formasPagamento')?.setValue(formasPagamento);
  }

  usarEnderecoCadastrado(event: MatCheckboxChange): void {
    const enderecoForm = this.servicoForm.get('endereco');
  
    if (event.checked && this.enderecoUsuario) {
      if (
        this.enderecoUsuario.rua &&
        this.enderecoUsuario.bairro &&
        this.enderecoUsuario.cidade &&
        this.enderecoUsuario.estado
      ) {
        // Atualiza o valor de 'endereco' no formulário
        enderecoForm?.patchValue({
          rua: this.enderecoUsuario.rua,
          bairro: this.enderecoUsuario.bairro,
          cidade: this.enderecoUsuario.cidade,
          estado: this.enderecoUsuario.estado
        });
  
        // Força a atualização do formulário
        enderecoForm?.markAsTouched();
        enderecoForm?.disable();
        enderecoForm?.updateValueAndValidity();
  
        console.log("Endereço atualizado:", this.servicoForm.value.endereco);  // Verifique se os dados de endereco estão corretos
      } else {
        this.snackBar.open('Endereço do usuário não está completo. Preencha todos os campos do endereço.', 'Fechar', {
          duration: 3000
        });
        enderecoForm?.reset();
        enderecoForm?.enable();
      }
    } else {
      enderecoForm?.reset();
      enderecoForm?.enable();
    }
  }
}