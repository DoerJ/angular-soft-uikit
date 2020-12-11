import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { NeumoService } from '@app/service';

var self: NeumoInputTextComponent;
@Component({
  selector: 'neumo-input-text',
  templateUrl: './neumo-input-text.component.html',
  styleUrls: ['./neumo-input-text.component.less']
})
export class NeumoInputTextComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() label: string;
  @Input() name: string;
  @Input() required: boolean;
  @Input() placeholder: string = '';
  @Input() backgroundColor: string;
  @Input() corner: string;
  @Input() model: string;
  @Output() modelChange = new EventEmitter<string>();

  shadows: any = {};
  background: string;
  _style: any = {
    'border-radius': `4px`,
    'outline': 'none'
  };
  // debounce time 
  delay: number = 500;
  updateModel: Subject<any> = new Subject<any>();

  // default neumo params
  neumoProps: any = {
    distance: 5,
    blur: 10,
    intensity: 0.11
  }

  constructor(private detectorRef: ChangeDetectorRef) {
    self = this;
    self.updateModel.pipe(debounceTime(self.delay)).subscribe(() => {
      self.modelOnChange();
    });
  }

  ngOnInit(): void {
    self.background = self.backgroundColor ? self.backgroundColor : '#ffffff';
    self.shadows = NeumoService.getShadowByIntensity(self.background, self.neumoProps.intensity);
  }

  ngAfterViewInit(): void {
    var inputbox: HTMLElement = document.getElementById(self.name);
    var rect: DOMRect = inputbox.getBoundingClientRect();
    self.neumoProps.width = rect.width;
    self.neumoProps.background = self.background;
    self.neumoProps.shadows = self.shadows;
    self.neumoProps.corner = self.corner;
    
    var style: any = NeumoService.getStyles('dent', self.neumoProps);
    self._style = {...self._style, ...style};
    // notify the detection tree about the style change
    self.detectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    self.updateModel.unsubscribe();
  }

  modelOnChange(): void {
    self.modelChange.emit(self.model);
  }
  
}
