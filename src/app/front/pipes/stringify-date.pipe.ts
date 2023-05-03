import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringifyDate'
})
export class StringifyDatePipe implements PipeTransform {

  transform(value: Date): string {
    return value.toISOString().split("T")[0];
  }
}
