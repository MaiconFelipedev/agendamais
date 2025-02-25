import { Component } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule, HeaderComponent]
})
export class AppComponent {
  title = 'Agenda+';
  constructor(private titleService: Title, private router: Router) {
    this.titleService.setTitle(this.title);
  }
}
