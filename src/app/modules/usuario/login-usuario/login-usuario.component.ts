import { Component } from '@angular/core';
import {MaterialModule} from '../../material/material.module';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  styleUrls: ['./login-usuario.component.scss']
})
export class LoginUsuarioComponent {
}
