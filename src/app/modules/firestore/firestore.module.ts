import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { firestoreConfig } from '../../../../firestore.config'
import { AngularFireModule} from '@angular/fire/compat';
import { AngularFireStorageModule } from "@angular/fire/compat/storage";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(firestoreConfig)
  ]
})
export class FirestoreModule { }
