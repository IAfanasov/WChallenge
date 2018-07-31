import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextProcessorComponent } from './text-processor.component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { SelectionDisplayComponent } from './selection-display/selection-display.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TextProcessorComponent,
    TextEditorComponent,
    ColorPickerComponent,
    SelectionDisplayComponent
  ],
  exports: [
    TextProcessorComponent
  ]
})
export class TextProcessorModule { }
