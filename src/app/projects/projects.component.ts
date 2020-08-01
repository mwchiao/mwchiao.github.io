import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Observable<any[]>;

  constructor(private db: AngularFireDatabase) { 
    this.projects = db.list('projects').valueChanges();
  }

  ngOnInit(): void {
  }

}
