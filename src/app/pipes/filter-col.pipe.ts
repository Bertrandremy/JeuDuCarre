import { Pipe, PipeTransform } from '@angular/core';
import { Square } from '../models/square';

@Pipe({
  name: 'filterCol'
})

export class FilterColPipe implements PipeTransform {

  transform(value: Square[], line: number): any {
    value = value.filter(item => item.line == line);
    return value;
  }

}
