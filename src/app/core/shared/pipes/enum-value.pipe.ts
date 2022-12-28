import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'enumValue'
})
export class EnumValuePipe implements PipeTransform {

  // @ts-ignore
  transform(value: any, x: any): any {
    // @ts-ignore
    let keys = Object.keys(value).filter(x => value[x] == x);

    return keys.length > 0 ? keys[0] : null;
  }

}
