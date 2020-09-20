import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isCollapsed: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleNavbar(event: Event) {
    const target = event.currentTarget as Element;
    const id = target.getAttribute("data-target") || ".navbar-collapse";

    this.isCollapsed = !this.isCollapsed;
    target.setAttribute("aria-expanded", this.isCollapsed.toString());
  }
}
