import { Directive, ElementRef, inject, output } from '@angular/core';

@Directive({
  selector: '[clickOutside]',
  host: {
    '(document:click)': 'checkClick($event)'
  }
})
export class Clickoutside {

 private el = inject(ElementRef); // Fait référence à l'élément sur lequel la directive est placée

  clickOutside = output<void>();

  checkClick(event: Event): void {
    !this.isInside(event.target as HTMLElement) && this.clickOutside.emit()
  }

  isInside(elementToCheck: HTMLElement): boolean {
    return (
      elementToCheck === this.el.nativeElement ||
      this.el.nativeElement.contains(elementToCheck)
    );
  }

}
