import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import {firestoreConfig} from '../firestore.config';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import {provideRouter} from '@angular/router';
import {routes} from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    { provide: FIREBASE_OPTIONS, useValue: firestoreConfig },
    provideFirebaseApp(() => initializeApp(firestoreConfig)),
    provideFirestore(() => getFirestore()),
    provideRouter(routes)
  ],
}).catch(err => console.error(err));
