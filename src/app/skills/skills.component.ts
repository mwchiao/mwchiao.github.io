import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInAnim } from '../animations'

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
  animations: [
    trigger('loadIn', [
      transition('* => *', [
        useAnimation(fadeInAnim)
      ])
    ])
  ]
})

export class SkillsComponent implements OnInit {

  @Input() private _skills$: Observable<any[]>;
  skills: any[];
  loading: boolean = true;

  constructor() {
    this._skills$ = new Observable<any[]>();
    this.skills = [];
  }

  ngOnInit(): void {
    this._skills$.subscribe((skills) => {
      this.loading = true;
      this.skills = skills;
      this.loading = false;
    })
  }

}
