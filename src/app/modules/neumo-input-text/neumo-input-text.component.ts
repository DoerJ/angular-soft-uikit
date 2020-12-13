import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { NeumoService } from '@app/service';

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

  // style params
  shadows: any = {};
  background: string;
  _style: any = {
    'border': 'none',
    'border-radius': `4px`,
    'outline': 'none'
  };

  // debounce time 
  delay: number = 500;
  updateModel: Subject<any> = new Subject<any>();

  constructor() {
    var self = this;
    self.updateModel.pipe(debounceTime(self.delay)).subscribe(() => {
      self.modelOnChange();
    });
  }

  ngOnInit(): void {
    var self = this;
    self.background = self.backgroundColor ? self.backgroundColor : '#ffffff';
    self.shadows = NeumoService.getShadowByIntensity(self.background);
  }

  ngAfterViewInit(): void {
    var self = this;
    var inputbox: HTMLElement = document.getElementById(self.name);
    var rect: DOMRect = inputbox.getBoundingClientRect();

    var props = NeumoService.neumoPropsProcessor({
      width: rect.width,
      background: self.background,
      shadows: self.shadows,
      corner: self.corner
    });
    
    var style: any = NeumoService.getStyles('dent', props);
    self._style = {...self._style, ...style};
  }

  ngOnDestroy(): void {
    this.updateModel.unsubscribe();
  }

  modelOnChange(): void {
    this.modelChange.emit(this.model);
  }

}
