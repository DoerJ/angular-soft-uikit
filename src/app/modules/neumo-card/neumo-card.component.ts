import { Component, Input, OnInit } from '@angular/core';

import { NeumoService } from '@app/service';

interface CardConfigs {
  image?: string,
  title?: string,
  text?: string,
  link?: string
}
var self: NeumoCardComponent;
@Component({
  selector: 'neumo-card',
  templateUrl: './neumo-card.component.html',
  styleUrls: ['./neumo-card.component.less']
})
export class NeumoCardComponent implements OnInit {

  @Input() cardData: CardConfigs;
  @Input() name: string;

  image: string;
  link: string;
  cardTitle: string;
  cardText: string;

  constructor() {
    self = this;
  }

  ngOnInit(): void {
    if (self.cardData) {
      self.image = self.cardData.image;
      self.link = self.cardData.link;
      self.cardTitle = self.cardData.title;
      self.cardText = self.cardData.text;
    }
  }

}
