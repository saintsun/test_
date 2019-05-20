import { Injectable } from '@angular/core';
import { utils, write, WorkBook } from 'xlsx';
import { saveAs } from 'file-saver';


@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  setAutoHeaderWidth() { }

  generateExcelAndExport(data, filteredHeader, fileName = 'result', sheetName = 'Report') {

    const workSheetName = sheetName;
    const workBook: WorkBook = { SheetNames: [], Sheets: {} };
    let workSheet: any;
    const excelList = _buildColumnsArray('A1:ZZ1');

    workSheet = utils.json_to_sheet(data);

    // Set header width automatically
    if (filteredHeader.length > 0) {
      const workSheetCols = [];
      filteredHeader.forEach(element => {
        workSheetCols.push({ wch: element.length + 6 });
      });
      workSheet['!cols'] = workSheetCols;
    }

    for (let i = 0; i < filteredHeader.length; i++) {
      const header = excelList[i] + '1';

      if (typeof workSheet[header] !== 'undefined' && workSheet[header] !== null) {
        workSheet[header].v = filteredHeader[i];
      }
    }

    workBook.SheetNames.push(workSheetName);
    workBook.Sheets[workSheetName] = workSheet;
    const workBookout = write(workBook, { bookType: 'xlsx', bookSST: true, type: 'binary' });

    saveAs(new Blob([s2ab(workBookout)], { type: 'application/octet-stream' }), fileName + '.xlsx');
  }
}

function alphaToNum(alpha) {
  let num = 0;
  const len = alpha.length;

  for (let i = 0; i < len; i++) {
    num = num * 26 + alpha.charCodeAt(i) - 0x40;
  }

  return num - 1;
}

function numToAlpha(num) {

  let alpha = '';

  for (; num >= 0; num = parseInt((num / 26) + '', 10) - 1) {
    alpha = String.fromCharCode(num % 26 + 0x41) + alpha;
  }

  return alpha;
}

function _buildColumnsArray(range) {
  const res = [];

  const rangeNum = range.split(':').map(function (val) {
    return alphaToNum(val.replace(/[0-9]/g, ''));
  });

  const start = rangeNum[0];
  const end = rangeNum[1] + 1;

  for (let i = start; i < end; i++) {
    res.push(numToAlpha(i));
  }

  return res;
}

function s2ab(s) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);

  for (let i = 0; i !== s.length; ++i) {
    // tslint:disable-next-line:no-bitwise
    view[i] = s.charCodeAt(i) & 0xFF;
  };

  return buf;
}
