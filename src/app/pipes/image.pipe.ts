import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {
  url: string = environment.API;


  transform(value: unknown, ...args: unknown[]): unknown {
    if (typeof value === 'undefined' || value === null) {
      return 'assets/img/overview.jpeg';
    }
    return this.url + value
  }

}
