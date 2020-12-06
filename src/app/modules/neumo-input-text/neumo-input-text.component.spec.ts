import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeumoInputTextComponent } from './neumo-input-text.component';

describe('NeumoInputTextComponent', () => {
  let component: NeumoInputTextComponent;
  let fixture: ComponentFixture<NeumoInputTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeumoInputTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NeumoInputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
