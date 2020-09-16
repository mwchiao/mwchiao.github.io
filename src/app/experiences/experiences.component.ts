import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { trigger, transition, query, animate, style } from '@angular/animations';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.css'],
  animations: [
    trigger('loadIn', [
      transition('* => *', [
        query('.card-body', style({opacity: 0})),
        query('.card-body', animate('1s ease-in', style({opacity: 1})))
      ])
    ])
  ]
})
export class ExperiencesComponent implements OnInit {
  private PAGINATION_LIMIT = 5;

  @Input() private _jobs$: Observable<any[]>;
  jobs: any[];
  currentJobIndex: number = 0;

  private _currentPageGroup: number = 0;
  private _numPageGroups: number = 0;
  numIndicators: number = this.PAGINATION_LIMIT;

  loading:boolean = true;
  
  constructor() {
    this._jobs$ = new Observable<any[]>();
    this.jobs = [];
  }

  ngOnInit(): void {
    this._jobs$.subscribe(jobs => {
      this.loading = true;
      this.jobs = jobs;
      this._numPageGroups = Math.ceil(this.jobs.length/this.PAGINATION_LIMIT);
      this._setupPagination();
      if (this.currentJobIndex > this.jobs.length - 1) this.currentJobIndex = this.jobs.length - 1;
      this.loading = false;
    });
  }

  changeIndex(change: number) {
    this.currentJobIndex += change;
    this._currentPageGroup = Math.floor(this.currentJobIndex/this.PAGINATION_LIMIT);
    this._setupPagination();
  }

  private _setupPagination() {
    if (this._currentPageGroup == this._numPageGroups - 1) {
      this.numIndicators = (this.jobs.length % this.PAGINATION_LIMIT);
    }
    else {
      this.numIndicators = this.PAGINATION_LIMIT;
    }
  }

  isActive(i: number): boolean {
    return i == this.currentJobIndex % this.PAGINATION_LIMIT;
  }
}
