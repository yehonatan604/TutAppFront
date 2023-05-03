import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'beautifyDate'
})
export class BeautifyDatePipe implements PipeTransform {

  transform(value: Date): string {
    return new Date(value).toLocaleDateString();
  }
}
