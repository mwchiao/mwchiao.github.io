import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {

  @Input() private _projects$: Observable<any[]>;
  projects: any[];
  private _subscription: Subscription;

  private _width: number = 0;
  numCols: number = 0;
  numRows: number = 0;
  numProjects: number = 0;

  rows: number[] = [];

  loading: boolean = true;

  constructor() { 
    this._projects$ = new Observable<any[]>();
    this.projects = [];
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this._subscription = this._projects$.subscribe((projects) => {
      this.loading = true;
      this.numProjects = projects.length;
      this.projects = projects;
      this._width = window.innerWidth;
      this._configureGrid();
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    if (this._subscription) this._subscription.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this._width = event.target.innerWidth;
    this._configureGrid();
  }

  private _getNumCols(): number {
    if (this._width > 992) return 3;
    if (this._width > 768) return 2;
    return 1;
  }

  private _getNumRows(): number {
    return Math.ceil(this.numProjects / this.numCols);
  }

  private _configureGrid() {
    this.numCols = this._getNumCols();
    this.numRows = this._getNumRows();
    this.rows = Array(this.numRows).fill(this.numCols);
    if (this.numProjects % this.numRows > 0) {
      this.rows[this.numRows - 1] = this.numProjects % this.numRows;
    }
  }

  get projects$(): Observable<any[]> {
    return this._projects$;
  }
}
