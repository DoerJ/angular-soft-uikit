import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.less']
})
export class DemoComponent implements OnInit {
  // background color 
  _backgroundColor: string = '#d6d1d1';

  // neumo-card 
  _cardConfigs: any = {
    title: 'Example Card Title',
    text: 'This is an example text',
    link: '#'
  }

  constructor() { }

  ngOnInit(): void {
  }

}
