import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { routes } from './app.routes';

@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        HeaderComponent
    ],
    providers: [],
    bootstrap: [],
})
export class AppModule {}
