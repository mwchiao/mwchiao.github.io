import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Project } from '../data-interfaces';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {

  @Input() private _projects$: Observable<Project[]>;
  private _subscription: Subscription;

  loading: boolean = true;

  constructor() { 
    this._projects$ = new Observable<Project[]>();
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this._subscription = this._projects$.subscribe(() => {
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    if (this._subscription) this._subscription.unsubscribe();
  }

  get projects$(): Observable<any[]> {
    return this._projects$;
  }
}
