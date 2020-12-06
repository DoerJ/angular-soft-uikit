import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

var self: NeumoInputTextComponent;
@Component({
  selector: 'neumo-input-text',
  templateUrl: './neumo-input-text.component.html',
  styleUrls: ['./neumo-input-text.component.less']
})
export class NeumoInputTextComponent implements OnInit, AfterViewInit {

  @Input() name: string;
  @Input() required: boolean;
  @Input() placeholder: string = '';
  @Input() backgroundColor: string;

  inputbox_width: number;
  inputbox_height: number;
  shadow: string;

  // default neumo params
  neumoDefault: any = {
    distance: 5,
    blur: 10,
    intensity: 0.11
  }

  constructor() {
    self = this;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    var inputbox: HTMLElement = document.getElementById(self.name);
    var rect: DOMRect = inputbox.getBoundingClientRect();
    self.inputbox_width = rect.width;
    self.inputbox_height = rect.height;

    var background = self.backgroundColor ? self.backgroundColor : '#ffffff';
    self.shadow = self.getShadowByIntensity(background);
  }

  getShadowByIntensity(background_hex: string): string {
    var shadow_hex: string = '#';
    var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(background_hex);
    var colors: any = {
      r: parseInt(rgb[1], 16),
      g: parseInt(rgb[2], 16),
      b: parseInt(rgb[3], 16)
    };
    Object.keys(colors).forEach(color => {
      let shadow_color: number = Math.floor(colors[color] * (1 - self.neumoDefault.intensity));
      let hex: string = shadow_color.toString(16);
      hex = hex.length === 1 ? '0' + hex : hex;
      shadow_hex += hex;
    })
    return shadow_hex;
  }
}
