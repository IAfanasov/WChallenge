import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextProcessorComponent } from './text-processor.component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { SelectionDisplayComponent } from './selection-display/selection-display.component';
import { Color } from './color.enum';
import { By } from '@angular/platform-browser';

describe('TextProcessorComponent', () => {
  let component: TextProcessorComponent;
  let fixture: ComponentFixture<TextProcessorComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TextProcessorComponent,
        TextEditorComponent,
        ColorPickerComponent,
        SelectionDisplayComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextProcessorComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
    document.getSelection().empty();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('highlightSelection', () => {

    it('Handle no selection', () => {
      component.highlightSelection();
    });

    it('Highlight peace of text and remove background color if highlight color is not selected', () => {

      const editorHtmlElement = document.querySelector('.text-editor-container');

      // set text in editor and select part of it
      editorHtmlElement.innerHTML = 'Text for selection test';
      selectTextInsideNode(editorHtmlElement, 0, 10);

      // highlight text with yellow
      component.highlightColor = Color.yellow;
      component.highlightSelection();

      // check
      const highlightedTag = editorHtmlElement.firstChild as HTMLElement;
      expect(highlightedTag.style.backgroundColor.toLowerCase())
        .toEqual(Color.yellow.toLowerCase());

      // remove highlighting
      component.highlightColor = null;
      component.highlightSelection();

      expect(editorHtmlElement.childElementCount).toEqual(0);
    });

    it('Highlight peace of text in the middle of highlighted text', () => {
      const editorHtmlElement = document.querySelector('.text-editor-container');

      // set text in editor and select part of it
      editorHtmlElement.innerHTML = 'Text for selection test';

      selectTextInsideNode(editorHtmlElement, 0, 10);

      // highlight text with yellow
      component.highlightColor = Color.yellow;
      component.highlightSelection();

      // inside yellow highlighted tag select some text
      const yellowHighlightedTag = editorHtmlElement.firstChild as HTMLElement;
      document.getSelection().empty();
      selectTextInsideNode(yellowHighlightedTag, 2, 4);

      // highlight text in the middle of yellow with red color
      component.highlightColor = Color.red;
      component.highlightSelection();

      // check
      const firstHighlightedTag = editorHtmlElement.firstChild as HTMLElement;
      expect(firstHighlightedTag.style.backgroundColor.toLowerCase())
        .toEqual(Color.yellow.toLowerCase(), 'Expected first child to be yellow');

      const secondHighlightedTag = editorHtmlElement.children[1] as HTMLElement;
      expect(secondHighlightedTag.style.backgroundColor.toLowerCase())
        .toEqual(Color.red.toLowerCase(), 'Expected middle child to be red');

      const thirdHighlightedTag = editorHtmlElement.children[2] as HTMLElement;
      expect(thirdHighlightedTag.style.backgroundColor.toLowerCase())
        .toEqual(Color.yellow.toLowerCase(), 'Expected last child to be yellow');
    });

  });

  describe('isSelectionInsideTextEditor', () => {

    it('Handle no selection', () => {
      component.isSelectionInsideTextEditor();
    });

    it('Selection inside text editor', () => {
      const editorHtmlElement = document.querySelector('.text-editor-container');

      // set text in editor and select part of it
      editorHtmlElement.innerHTML = 'Text for selection test';
      selectTextInsideNode(editorHtmlElement, 0, 10);

      expect(component.isSelectionInsideTextEditor()).toEqual(true);
    });

    it('Selection outside text editor', () => {
      const colorPicker = document.querySelector('app-color-picker');

      const firstRange = document.createRange();
      firstRange.setStart(colorPicker, 0);
      firstRange.setEnd(colorPicker, 1);
      document.getSelection().addRange(firstRange);

      expect(component.isSelectionInsideTextEditor()).toEqual(false);
    });

    it('Selection starts inside text editor and is finished outside', () => {

      const editorHtmlElement = document.querySelector('.text-editor-container');
      const firstHeader = document.querySelector('h2');

      const range = document.createRange();
      range.setStart(firstHeader, 0);
      range.setEnd(editorHtmlElement, 1);
      document.getSelection().addRange(range);

      expect(component.isSelectionInsideTextEditor()).toEqual(false);
    });

    it('Selection starts outside text editor and is finished inside', () => {

      const headers = document.querySelectorAll('h2');

      const range = document.createRange();
      range.setStart(headers[0], 0);
      range.setEnd(headers[1], 1);
      document.getSelection().addRange(range);

      expect(component.isSelectionInsideTextEditor()).toEqual(false);
    });

  });

  describe('onFilterColorChange', () => {

    it('New filter color should be passed to selection display component', () => {
      component.filterColor = Color.yellow;

      fixture.detectChanges();
      const selectionDisplayComponent: SelectionDisplayComponent
        = debugElement.query(By.directive(SelectionDisplayComponent)).componentInstance;

      expect(selectionDisplayComponent.filterColor).toEqual(Color.yellow);
    });

  });

});


function selectTextInsideNode(htmlElement: Element, from: number, to: number) {
  const textNode = htmlElement.childNodes[0];
  const firstRange = document.createRange();
  firstRange.setStart(textNode, from);
  firstRange.setEnd(textNode, to);
  document.getSelection().addRange(firstRange);
}
