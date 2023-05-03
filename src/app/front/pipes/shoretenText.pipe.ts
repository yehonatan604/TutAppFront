import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenText'
})
export class ShortenTextPipe implements PipeTransform {
  transform(value: string, end:number): string {
    return value.substring(0, end-3) + '...';
  }
}
