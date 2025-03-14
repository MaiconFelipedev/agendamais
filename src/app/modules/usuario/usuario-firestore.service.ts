import { Injectable } from '@angular/core';
import { getFirestore, collection, addDoc, query, where, getDocs } from '@angular/fire/firestore';
import {Usuario} from '../../shared/model/usuario';
import {from, map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioFirestoreService {

  private bancoRemoto = getFirestore();
  private colecaoUsuarios = collection(this.bancoRemoto, "usuarios");

  // cadastra um usuário e retorna um objeto Usuário já com o id do firestore
  cadastrar(usuario: Usuario): Observable<Usuario | null>{
    delete usuario.id;

    return from(addDoc(this.colecaoUsuarios, {...usuario}))
      .pipe(
        map(usuarioSalvo => new Usuario(
          usuario.nome,
          usuario.email,
          usuario.senha,
          usuario.telefone,
          usuario.tipo,
          usuario.endereco,
          usuario.verificado,
          usuarioSalvo.id
        ))
      )
  }

  // retorna um observable de usuário (sem id do firestore) se o email informado estiver cadastrado ou um observable de null se não estiver
  estaCadastrado(email: string): Observable<Usuario | null>{

    const q = query(this.colecaoUsuarios, where("email", "==", email));
    return from(getDocs(q)).pipe(
      map(resposta => {
        const doc = resposta.docs[0];
        return doc ? { ...doc.data() } as Usuario : null;
      })
    )
  }

  autenticar(email: string, senha: string): Observable<Usuario | null> {
    const q = query(
      this.colecaoUsuarios,
      where("email", "==", email),
      where("senha", "==", senha)
    );

    return from(getDocs(q)).pipe(
      map(resposta => {
        const doc = resposta.docs[0];
        return doc ? new Usuario(
          doc.data()['nome'],
          doc.data()['email'],
          doc.data()['senha'],
          doc.data()['telefone'],
          doc.data()['tipo'],
          doc.data()['endereco'],
          doc.data()['verificado'],
          doc.id
        ) : null;
      })
    );
  }

}
