import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { 
  MainComponent,
  DemoComponent,
  NeumoInputTextComponent,
  NeumoButtonComponent
} from '@app/component';

@NgModule({
  declarations: [
  MainComponent,
  NeumoInputTextComponent,
  DemoComponent,
  NeumoButtonComponent
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
