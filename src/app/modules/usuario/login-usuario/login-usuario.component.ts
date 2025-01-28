import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-usuario',
  imports: [CommonModule, RouterModule],
  templateUrl: './login-usuario.component.html',
  standalone: true,
  styleUrls: ['./login-usuario.component.scss']
})
export class LoginUsuarioComponent {
}
