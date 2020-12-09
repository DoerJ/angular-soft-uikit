import { NONE_TYPE } from '@angular/compiler';
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NeumoService } from '@app/service';

var self: NeumoButtonComponent;
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
  inputboxWidth: number;
  inputboxHeight: number;
  neumoProps: any = {
    distance: 5,
    blur: 10,
    intensity: 0.11
  };
  style: any = {
    'border': 'none',
    'border-radius': `4px`,
    'outline': 'none'
  };

  constructor(private detectorRef: ChangeDetectorRef) {
    self = this;
  }

  ngOnInit(): void {
    self.background = self.backgroundColor ? self.backgroundColor : '#ffffff';
    self.shadows = NeumoService.getShadowByIntensity(self.background, self.neumoProps.intensity);
  }

  ngAfterViewInit(): void {
    var inputbox: HTMLElement = document.getElementById(self.name);
    var rect: DOMRect = inputbox.getBoundingClientRect();
    self.inputboxWidth = rect.width;
    self.inputboxHeight = rect.height;
    self.applyStyles();
  }

  applyStyles(): void {
    if (self.corner && self.corner === 'round') {
      self.style['border-radius'] = self.inputboxWidth / 2 + 'px';
    }
    self.style.background = self.background;
    self.style['box-shadow'] = `${self.neumoProps.distance}px ${self.neumoProps.distance}px ${self.neumoProps.blur}px ${self.shadows.dark},` + 
      `-${self.neumoProps.distance}px -${self.neumoProps.distance}px ${self.neumoProps.blur}px ${self.shadows.light}`;
    // notify the detection tree about the style change
    self.detectorRef.detectChanges();
  }
}