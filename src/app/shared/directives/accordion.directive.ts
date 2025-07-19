import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';


@Directive({
  selector: '[appAccordion]'
})
export class AccordionDirective {

  private _appAccordion: boolean;
  @Input() set appAccordion(new_value: boolean) {
    this._appAccordion = new_value;

    if (this._appAccordion) {
      this.renderer.setStyle(this.el.nativeElement, 'max-height', `${this.el.nativeElement.scrollHeight}px`);
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'max-height', `0px`);
    }
  };


  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
  ) { }
}
