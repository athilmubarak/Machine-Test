import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  //Variables
  menus: string[] = ['posts', 'users'];
  selected_menu: string = 'posts';

  constructor() { }

  ngOnInit(): void {
  }

}
