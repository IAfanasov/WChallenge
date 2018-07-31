import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TextProcessorModule } from './text-processor/text-processor.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TextProcessorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
