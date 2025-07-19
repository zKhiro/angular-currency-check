import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';


@Directive({
  selector: '[appAccordion]'
})
export class AccordionDirective {

  private _appAccordion: boolean;
  get appAccordion(): boolean { return this._appAccordion }
  @Input() set appAccordion(new_value: boolean) {
    this._appAccordion = new_value;

    this.setMaxHeight();
  };


  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
  ) { }


  @HostListener("window:resize")
  onWindowRezise() {
    this.setMaxHeight();
  }

  private setMaxHeight() {
    if (this.appAccordion) {
      this.renderer.setStyle(this.el.nativeElement, 'max-height', `${this.el.nativeElement.scrollHeight}px`);
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'max-height', `0px`);
    }
  }
}
