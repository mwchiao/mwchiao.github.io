import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Skill } from '../data-interfaces';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})

export class SkillsComponent implements OnInit, OnDestroy {

  @Input() private _skills$: Observable<Skill[]>;
  private _subscription: Subscription;
  loading: boolean = true;

  constructor() {
    this._skills$ = new Observable<Skill[]>();
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this._subscription = this._skills$.subscribe(() => {
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    if (this._subscription) this._subscription.unsubscribe();
  }

  get skills$(): Observable<Skill[]> {
    return this._skills$;
  }
}
