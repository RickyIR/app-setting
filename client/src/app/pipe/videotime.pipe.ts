import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'videoTime'
})
export class VideoTimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const dur = moment.duration(value);
    return `${dur.get('h') ? dur.get('h') : ''}${dur.get('m')}:${dur.get('s')}`;
  }

}
