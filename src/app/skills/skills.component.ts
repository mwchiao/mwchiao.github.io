import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})

export class SkillsComponent implements OnInit, OnDestroy {

  @Input() private _skills$: Observable<any[]>;
  private _subscription: Subscription;
  skills: any[];
  loading: boolean = true;

  constructor() {
    this._skills$ = new Observable<any[]>();
    this.skills = [];
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this._subscription = this._skills$.subscribe((skills) => {
      this.loading = true;
      this.skills = skills;
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    if (this._subscription) this._subscription.unsubscribe();
  }

}
