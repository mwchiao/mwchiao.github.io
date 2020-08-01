import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.css']
})
export class ExperiencesComponent implements OnInit {

  jobs: Observable<any[]>;
  skills: Observable<any[]>;
  
  constructor(private db: AngularFireDatabase) { 
    this.jobs = db.list('jobs').valueChanges();
    this.skills = db.list('skills').valueChanges();
  }

  ngOnInit(): void {
    
  }

}
