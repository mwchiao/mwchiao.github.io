import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Job, Project, Skill } from './data-interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mwchiao-ghpage';

  private _jobs$: Observable<Job[]>;
  private _projects$: Observable<Project[]>;
  private _skills$: Observable<Skill[]>;

  constructor(private afs: AngularFirestore) {
    this._jobs$ = afs.collection<Job>("jobs" , ref => ref.orderBy("end", "desc")).valueChanges();
    this._projects$ = afs.collection<Project>("projects", ref => ref.orderBy("date", "desc")).valueChanges();
    this._skills$ = afs.collection<Skill>("skills", ref => ref.orderBy("name", "desc")).valueChanges();
  }

  get jobs(): Observable<Job[]>{
    return this._jobs$;
  }

  get projects(): Observable<Project[]> {
    return this._projects$;
  }

  get skills(): Observable<Skill[]> {
    return this._skills$;
  }
}
