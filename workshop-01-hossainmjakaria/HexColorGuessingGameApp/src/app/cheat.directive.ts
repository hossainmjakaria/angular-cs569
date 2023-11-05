import { Directive, ElementRef, HostListener, Input, Renderer2, ViewChild, ViewRef, inject } from '@angular/core';

@Directive({
  selector: '[cheat]'
})
export class CheatDirective {
  @Input('cheat') color: string = '#fff';

  #renderer = inject(Renderer2);
  #ell = inject(ElementRef<HTMLElement>);

  constructor() { }

  @HostListener('dblclick')
  alertColor() {
    //this.#renderer.setStyle(this.#ell.nativeElement, 'height', '600px')
    // this.#ell.nativeElement.style.height = '600px';
    alert(this.color);
  }
}
