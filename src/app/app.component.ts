import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mwchiao-ghpage';

  private _jobs$: Observable<any[]>;
  private _projects$: Observable<any[]>;
  private _skills$: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this._jobs$ = db.list('jobs').valueChanges();
    this._projects$ = db.list('projects').valueChanges();
    this._skills$ = db.list("skills").valueChanges();
  }

  getJobs() {
    return this._jobs$;
  }

  getProjects() {
    return this._projects$;
  }

  getSkills() {
    return this._skills$;
  }
}
