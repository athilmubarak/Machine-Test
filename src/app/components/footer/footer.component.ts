import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  to_day: Date = new Date();

  constructor() {
    setInterval(() => this.to_day = new Date(), 1000);
  }

  ngOnInit(): void {
  }

}
