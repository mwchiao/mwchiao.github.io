import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {

  @Input() private _projects$: Observable<any[]>;
  private _subscription: Subscription;

  loading: boolean = true;

  constructor() { 
    this._projects$ = new Observable<any[]>();
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
