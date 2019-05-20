import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor() { }

  getFileIconByExtension(extension: string): string {
    let returnValue = 'fa fa-file-o'

    const excelFileExtensions = ['XLS', 'XLSX', 'CSV'];
    const wordFileExtensions = ['DOC', 'DOCX'];
    const textFileExtensions = ['TXT'];
    const imageFileExtensions = ['JPG', 'PNG', 'BMP', 'GIF'];
    const pdfFileExtensions = ['PDF'];
    const archiveFileExtensions = ['RAR', 'ZIP', '7Z'];
    const codeFileExtensions = ['HTML', 'CS', 'JS', 'TS', 'CSS', 'XML', 'JSON', 'C', 'JAVA'];
    const powerPointFileExtensions = ['PPTX', 'PPT'];
    const mediaFileExtensions = ['AVI', 'MTS', 'M2TS', 'MP4', 'WMV', 'MKV', 'FLV', '3GP'];
    const audioFileExtensions = ['MP3', 'WAV', 'WMA', 'MIDI'];

    extension = extension.toUpperCase();

    switch (extension) {
      case excelFileExtensions.find(x => x === extension):
        returnValue = 'fa fa-file-excel-o';

        break;
      case wordFileExtensions.find(x => x === extension):
        returnValue = 'fa fa-file-word-o';

        break;
      case textFileExtensions.find(x => x === extension):
        returnValue = 'fa fa-file-text-o';

        break;
      case imageFileExtensions.find(x => x === extension):
        returnValue = 'fa fa-file-image-o';

        break;
      case pdfFileExtensions.find(x => x === extension):
        returnValue = 'fa fa-file-pdf-o';

        break;
      case archiveFileExtensions.find(x => x === extension):
        returnValue = 'fa fa-file-archive-o';

        break;
      case codeFileExtensions.find(x => x === extension):
        returnValue = 'fa fa-file-code-o';

        break;
      case powerPointFileExtensions.find(x => x === extension):
        returnValue = 'fa fa-file-powerpoint-o';

        break;
      case mediaFileExtensions.find(x => x === extension):
        returnValue = 'fa fa-file-video-o';

        break;
      case audioFileExtensions.find(x => x === extension):
        returnValue = 'fa fa-file-audio-o';

        break;
    }

    return returnValue;
  }
}
