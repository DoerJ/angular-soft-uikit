import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

var self: NeumoInputTextComponent;
@Component({
  selector: 'neumo-input-text',
  templateUrl: './neumo-input-text.component.html',
  styleUrls: ['./neumo-input-text.component.less']
})
export class NeumoInputTextComponent implements OnInit, AfterViewInit {

  @Input() label: string;
  @Input() name: string;
  @Input() required: boolean;
  @Input() placeholder: string = '';
  @Input() backgroundColor: string;
  @Input() corner: string;

  inputboxWidth: number;
  inputboxHeight: number;
  shadows: any = {};
  background: string;
  style: any = {
    'border-radius': `4px`
  };

  // default neumo params
  neumoProps: any = {
    distance: 5,
    blur: 10,
    intensity: 0.11
  }

  constructor(private detectorRef: ChangeDetectorRef) {
    self = this;
  }

  ngOnInit(): void {
    self.background = self.backgroundColor ? self.backgroundColor : '#d6d1d1';
    self.shadows = self.getShadowByIntensity(self.background);
  }

  ngAfterViewInit(): void {
    var inputbox: HTMLElement = document.getElementById(self.name);
    var rect: DOMRect = inputbox.getBoundingClientRect();
    self.inputboxWidth = rect.width;
    self.inputboxHeight = rect.height;
    self.applyStyles();
  }

  getShadowByIntensity(background_hex: string): any {
    var shadow_dark: string = '#';
    var shadow_light: string = '#';
    var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(background_hex);
    var colors: any = {
      r: parseInt(rgb[1], 16),
      g: parseInt(rgb[2], 16),
      b: parseInt(rgb[3], 16)
    };
    Object.keys(colors).forEach(color => {
      let darkcolor: number = Math.floor(colors[color] * (1 - self.neumoProps.intensity));
      let lightcolor: number = Math.floor(colors[color] * (1 + self.neumoProps.intensity));
      lightcolor = lightcolor > 255 ? 255 : lightcolor;
      let hex_dark: string = darkcolor.toString(16);
      let hex_light: string = lightcolor.toString(16);
      hex_dark = hex_dark.length === 1 ? '0' + hex_dark : hex_dark;
      hex_light = hex_light.length === 1 ? '0' + hex_light : hex_light;
      shadow_dark += hex_dark;
      shadow_light += hex_light;
    })

    return { dark: shadow_dark, light: shadow_light };
  }

  applyStyles(): void {
    if (self.corner && self.corner === 'round') {
      self.style['border-radius'] = self.inputboxWidth / 2 + 'px';
    }
    self.style.background = self.background;
    self.style['box-shadow'] = `inset ${self.neumoProps.distance}px ${self.neumoProps.distance}px ${self.neumoProps.blur}px ${self.shadows.dark},` + 
      `inset -${self.neumoProps.distance}px -${self.neumoProps.distance}px ${self.neumoProps.blur}px ${self.shadows.light}`;
    // notify the detection tree about the style change
    self.detectorRef.detectChanges();
  }
}
