import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

function startsWith(str: string, word: string) {
  return str.lastIndexOf(word, 0) === 0;
}

@Pipe({
  name: 'multiImg'
})

export class MultiImgPipe implements PipeTransform {
  url: string = environment.API;

  transform(value: string, ...args: unknown[]): unknown {
    if (typeof value === 'undefined' || value === null) {
      return 'assets/img/overview.jpeg';
    }
    else if (startsWith(value, 'data:image/') === true) {
      return value
    }
    else
      return this.url + value;
  }

}
