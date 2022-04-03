import { Pipe, PipeTransform } from '@angular/core';
import {Ingredient} from "../services/model/ingredient";

@Pipe({
  name: 'array'
})
export class ArrayPipe implements PipeTransform {

  transform(value: Ingredient[]): string {
    let result = "";

    value.forEach(function (item) {
      result += item.name + (item.spicy ? " spicy" : "") + ", ";
    })

    if (result.length !== 0){
      result = result.slice(0, -2);
    }

    return result;
  }
}
