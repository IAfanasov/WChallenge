import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent {

  @Input()
  colors: string[];

  @Output()
  selectedColorChange = new EventEmitter<String>();

  range: Range;

  _selectedColor: string;
  get selectedColor(): string {
    return this._selectedColor;
  }
  set selectedColor(value: string) {
    this._selectedColor = value;
    this.selectedColorChange.emit(value);
  }

  colorSelected(color: string) {
    this.selectedColor = color === this.selectedColor ? '' : color;
    // save selection to restore after color selected
    const selection = document.getSelection();
    this.range = selection.rangeCount && document.getSelection().getRangeAt(0) || null;
  }

  /** Restore selection if it was present */
  restoreSelection() {
    if (this.range) {
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(this.range);
      this.range = null;
    }
  }
}
