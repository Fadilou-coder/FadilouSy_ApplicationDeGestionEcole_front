import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summerize'
})
export class SummerizePipe implements PipeTransform {

  transform(value: string, length: number): string {
    console.log(value.length);
    if (value.length > length) {
      return value.substr(0, length)+'...';
    }
    return value;
  }


}
