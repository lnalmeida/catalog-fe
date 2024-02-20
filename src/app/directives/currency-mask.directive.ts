import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[currencyMask]'
})
export class CurrencyMaskDirective {

  constructor(private el: ElementRef) {}

  @HostListener('blur', ['$event'])
  onInput(event: any): void {
    const initialValue = this.el.nativeElement.value;

    if (initialValue) {
      const formattedValue = this.formatCurrency(initialValue);
      this.el.nativeElement.value = formattedValue;
    }
  }

  private formatCurrency(value: string): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parseFloat(value));
  }
}
