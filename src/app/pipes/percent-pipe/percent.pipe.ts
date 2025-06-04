import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percent',
  standalone: true
})
export class PercentPipe implements PipeTransform {

  transform(value: number, decimals: number = 0): string {
    if (isNaN(value)) return '';
    return `${value.toFixed(2) } %`;
  }

}
