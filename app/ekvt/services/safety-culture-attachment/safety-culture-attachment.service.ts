import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '@shared/models/api-response';
import { SafetyCultureAttachmentDto, SafetyCultureAttachmentSerializer } from '@app/ekvt/models/dto-models/safety-culture-attachment-dto';
import { IconService } from '@app/services/icon/icon.service';

@Injectable()
export class SafetyCultureAttachmentService extends ServiceCrudBase<SafetyCultureAttachmentDto> {
  constructor(httpClient: HttpClient,
    iconService: IconService) {
    super(
      httpClient,
      'ekvt/SafetyCultureAttachmentSearch',
      new SafetyCultureAttachmentSerializer(iconService)
    );
  }

  listByDatabaseId(databaseId: number): Observable<ApiResponse> {
    return this.get<SafetyCultureAttachmentDto[]>('ekvt/SafetyCultureAttachmentSearch/' + databaseId);
  }
}
