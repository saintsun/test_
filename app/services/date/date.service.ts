import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private _dateTimeFormat = 'DD.MM.YYYY - HH:mm';
  private _dateFormat = 'DD.MM.YYYY';

  constructor() { }

  checkDateTime(dateTime): any {
    return (dateTime !== undefined && dateTime + '' !== 'Invalid Date' && dateTime.getFullYear() !== 1) ?
      moment(dateTime).format(this._dateTimeFormat) : undefined;
  }

  checkDate(date): any {
    return (date !== undefined && date + '' !== 'Invalid Date' && date.getFullYear() !== 1) ?
      moment(date).format(this._dateFormat) : undefined;
  }

  getDateFormat(): string {
    return this._dateFormat;
  }

  getDateTimeFormat(): string {
    return this._dateTimeFormat;
  }
}
