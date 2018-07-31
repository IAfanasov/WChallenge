import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Color } from './color.enum';
import { TextEditorComponent } from './text-editor/text-editor.component';

/**
 * Composite component for highlighting text and filtering highlighted text
 */
@Component({
  selector: 'app-text-processor',
  templateUrl: './text-processor.component.html',
  styleUrls: ['./text-processor.component.scss']
})
export class TextProcessorComponent implements OnInit {

  /** Text editor element href */
  @ViewChild(TextEditorComponent, { read: ElementRef })
  textEditorElement: ElementRef;

  /** Selected for highlighting color */
  highlightColor: Color;
  /** Selected for filtering color */
  filterColor: Color;

  /** Array of available colors */
  get availableColors(): string[] {
    return Object.keys(Color);
  }

  ngOnInit() {
    // there is no event for finish of selection. Using mouseup instead
    this.textEditorElement.nativeElement
      .addEventListener('mouseup', () => this.highlightSelection());
  }

  /** Highlight selected text if it inside text editor */
  highlightSelection() {
    const selection = document.getSelection();
    if (selection.rangeCount && this.isSelectionInsideTextEditor()) {
      document.execCommand('BackColor', false, this.highlightColor || 'initial');
    }
  }

  /** Check if selection is inside of text editor */
  isSelectionInsideTextEditor() {
    const selection = document.getSelection();
    if (!selection.rangeCount) {
      return false;
    }

    const textEditorNativeElement = this.textEditorElement.nativeElement;

    // iterate parent elements until text editor or null reached
    let focusNode = selection.focusNode.parentElement;
    while (focusNode !== textEditorNativeElement && focusNode.parentElement) {
      focusNode = focusNode.parentElement;
    }

    let anchorNode = selection.anchorNode.parentElement;
    while (anchorNode !== textEditorNativeElement && anchorNode.parentElement) {
      anchorNode = anchorNode.parentElement;
    }

    // if reached text editor then selection is inside text editor
    return focusNode === textEditorNativeElement && anchorNode === textEditorNativeElement;
  }

  /** Handle change of highlight color */
  onHighlightColorChange(color) {
    this.highlightColor = color;
    this.highlightSelection();
  }

  /** Handle change of filter color */
  onFilterColorChange(color) {
    this.filterColor = color;
  }

}
