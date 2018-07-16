import { Directive, Input, ElementRef, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Extract necessary symbol information
// Return text of specified svg
const extractSymbol = (svg, name) => {
    return svg.split('<symbol')
    .filter((def: string) => def.includes(name))
    .map((def) => def.split('</symbol>')[0])
    .map((def) => '<svg ' + def + '</svg>');
};

@Directive({
    selector: '[useLoader]'
})
export class UseLoaderDirective implements OnChanges {

    @Input() useLoader: string;

    constructor (
        private element: ElementRef,
        private http: HttpClient
    ) {}

    ngOnChanges (values) {
        if (
            values.useLoader.currentValue &&
            values.useLoader.currentValue.includes('#')
        ) {
            // The resource url of the svg
            const src  = values.useLoader.currentValue.split('#')[0];
            // The id of the symbol definition
            const name = values.useLoader.currentValue.split('#')[1];

            // Load the src
            // Extract interested svg
            // Add svg to the element
            this.http.get(src, {responseType: 'text'}).subscribe(
                res =>  {
                    // console.log(res);
                    this.element.nativeElement.innerHTML = res;
                }
            );
        }
    }
}
