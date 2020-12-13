import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { NeumoService } from '@app/service';

@Component({
  selector: 'neumo-button',
  templateUrl: './neumo-button.component.html',
  styleUrls: ['./neumo-button.component.less']
})
export class NeumoButtonComponent implements OnInit, AfterViewInit {

  @Input() label: string;
  @Input() name: string;
  @Input() backgroundColor: string;
  @Input() corner: string;

  background: string;
  shadows: any = {};
  neumoProps: any = {
    distance: 5,
    blur: 10,
    intensity: 0.11
  };
  _style: any = {
    'border': 'none', 
    'border-radius': `4px`,
    'outline': 'none'
  };

  constructor() {}

  ngOnInit(): void {
    this.background = this.backgroundColor ? this.backgroundColor : '#ffffff';
    this.shadows = NeumoService.getShadowByIntensity(this.background);
  }

  ngAfterViewInit(): void {
    var inputbox: HTMLElement = document.getElementById(this.name);
    var rect: DOMRect = inputbox.getBoundingClientRect();
    this.neumoProps.width = rect.width;
    this.neumoProps.background = this.background;
    this.neumoProps.shadows = this.shadows;
    this.neumoProps.corner = this.corner;

    var style = NeumoService.getStyles('emboss', this.neumoProps);
    this._style = {...this._style, ...style};
  }

  onClick(): void {
  }
}
