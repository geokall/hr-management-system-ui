import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'hourMinutesSecs'
})
export class HourMinutesSecsPipe implements PipeTransform {

  transform(totalSeconds: number | null, ...args: unknown[]): unknown {
    totalSeconds = totalSeconds ? totalSeconds : 0;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    let result = `${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    if (!!hours) {
      result = `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    return result;
  }

}
