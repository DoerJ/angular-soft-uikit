import { Injectable } from '@angular/core';
import * as data from 'src/assets/json/neumoParams.json';

interface NeumoProps {
  distance: number,
  intensity: number,
  blur: number
}
@Injectable({
  providedIn: 'root'
})
export class NeumoService {

  static neumoProps: any = (data as any).default['default'];

  constructor() { }

  static getShadowByIntensity(background_hex: string): any {
    var shadow_dark: string = '#';
    var shadow_light: string = '#';
    var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(background_hex);
    var colors: any = {
      r: parseInt(rgb[1], 16),
      g: parseInt(rgb[2], 16),
      b: parseInt(rgb[3], 16)
    };
    Object.keys(colors).forEach(color => {
      let darkcolor: number = Math.floor(colors[color] * (1 - NeumoService.neumoProps.intensity));
      let lightcolor: number = Math.floor(colors[color] * (1 + NeumoService.neumoProps.intensity));
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

  static getStyles(type: string, props: any): any {
    var style: any = {};
    if (props.corner && props.corner === 'round') {
      style['border-radius'] = props.width / 2 + 'px';
    }
    style.background = props.background;
    var defaultShadow: string = `inset ${props.distance}px ${props.distance}px ${props.blur}px ${props.shadows.dark},` + 
    `inset -${props.distance}px -${props.distance}px ${props.blur}px ${props.shadows.light}`;
    switch (type) {
      case 'dent':
        style['box-shadow'] = defaultShadow;
        break;
      case 'emboss':
        style['box-shadow'] = `${props.distance}px ${props.distance}px ${props.blur}px ${props.shadows.dark},` + 
          `-${props.distance}px -${props.distance}px ${props.blur}px ${props.shadows.light}`;
        break;
      default: 
        style['box-shadow'] = defaultShadow;
        break;
    }
    
    return style;
  }

  static neumoPropsProcessor(extras: any): any {
    var props: any = {};
    Object.keys(extras).forEach(key => {
      props[`${key}`] = extras[`${key}`];
    })
    
    return {...NeumoService.neumoProps, ...props};
  }
}
