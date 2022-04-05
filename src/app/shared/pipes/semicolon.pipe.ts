import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'semicolon'
})
export class SemicolonPipe implements PipeTransform {

  transform(value: string): string {
    let array = value.split(",");
    return array[0] + array[1] + array[2];
  }

}
