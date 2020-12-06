import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { 
  MainComponent,
  DemoComponent,
  NeumoInputTextComponent
} from '@app/component';

@NgModule({
  declarations: [
  MainComponent,
  NeumoInputTextComponent,
  DemoComponent
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
