import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  wedding = { name: 'our wedding' };
  menuItems: MenuItem[];

  constructor() {
    this.sidenavActions = new EventEmitter<any>();
    this.sidenavParams = [];

    this.menuItems = [
          { name: "Our Story", route: "/our-story" },
          { name: "When & where", route: "/when-where" }
      ];
  }

  close() {
    this.sidenavActions.emit({ action: 'sideNav', params: ['hide'] });
  }

  sidenavActions: EventEmitter<any>;
  sidenavParams: any[];
}

export interface MenuItem {

  name: string;
  route: string;
}