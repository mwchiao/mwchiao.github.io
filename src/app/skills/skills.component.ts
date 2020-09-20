import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';
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

export class SkillsComponent implements OnInit, AfterViewInit {

  @Input() private _skills$: Observable<any[]>;
  skills: any[];
  loading: boolean = true;

  private _observer: IntersectionObserver;
  isVisible = false;

  constructor(private el: ElementRef) {
    this._skills$ = new Observable<any[]>();
    this.skills = [];

    this._observer = new IntersectionObserver((entries) => {
      entries.forEach( entry => {
        if (entry.isIntersecting === true) {
          this.isVisible = true;
          this._observer.unobserve(this.el.nativeElement as HTMLElement);
          this._observer.disconnect();
        }
      });
    }, {root: document.querySelector("#skills")});
  }

  ngOnInit(): void {
    this._skills$.subscribe((skills) => {
      this.loading = true;
      this.skills = skills;
      this.loading = false;
    });
  }
  
  ngAfterViewInit() {
    this._observer.observe(this.el.nativeElement as HTMLElement);
  }

}
