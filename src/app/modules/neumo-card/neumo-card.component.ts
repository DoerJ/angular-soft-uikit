import { Component, Input, OnInit } from '@angular/core';

import { NeumoService } from '@app/service';

interface CardConfigs {
  image?: string,
  title?: string,
  text?: string,
  link?: string
}
@Component({
  selector: 'neumo-card',
  templateUrl: './neumo-card.component.html',
  styleUrls: ['./neumo-card.component.less']
})
export class NeumoCardComponent implements OnInit {

  @Input() cardData: CardConfigs;
  @Input() name: string;
  @Input() backgroundColor: string;

  image: string;
  link: string;
  cardTitle: string;
  cardText: string;
  background: string;
  shadows: any;
  _style: any = {
    'border-radius': '3px',
    border: 'none'
  };
  // default neumo params
  neumoProps: any = {
    distance: 5,
    blur: 10,
    intensity: 0.11
  }

  constructor() {

  }

  ngOnInit(): void {
    var self = this;
    self.background = self.backgroundColor ? self.backgroundColor : '#ffffff';
    self.shadows = NeumoService.getShadowByIntensity(self.background);
    self.neumoProps.background = self.background;
    self.neumoProps.shadows = self.shadows;
    
    var style = NeumoService.getStyles('emboss', self.neumoProps);
    self._style = {...self._style, ...style};
  }

}
