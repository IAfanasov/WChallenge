import { Component, OnChanges, ChangeDetectionStrategy, Input } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-selection-display',
  templateUrl: './selection-display.component.html',
  styleUrls: ['./selection-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectionDisplayComponent implements OnChanges {

  @Input()
  filterColor: string;

  @Input()
  html: string;

  items: { color: string, text: string }[] = [];

  constructor(protected sanitize: DomSanitizer) { }

  ngOnChanges() {
    if (!this.html) {
      this.items = [];
      return;
    }

    const htmlElem = document.createElement('div');
    htmlElem.innerHTML = this.html;
    this.items = this.getColorChildsRecursive(htmlElem, this.filterColor);
  }

  /**
   * Selects all childs highlighted with color
   * @param htmlElement parent html element which childs should be searched
   * @param filterColor color to search for
   */
  getColorChildsRecursive(htmlElement: HTMLElement, filterColor: string): { color: string, text: string }[] {
    const result: { color: string, text: string }[] = [];

    for (let index = 0; index < htmlElement.children.length; index++) {
      const element = htmlElement.children[index] as HTMLElement;
      if (element.style.backgroundColor && element.style.backgroundColor !== 'initial'
        && (!filterColor || element.style.backgroundColor === filterColor)
      ) {
        result.push({ color: element.style.backgroundColor, text: element.innerText });
      }
      result.push(...this.getColorChildsRecursive(element, filterColor));
    }

    return result;
  }

}
