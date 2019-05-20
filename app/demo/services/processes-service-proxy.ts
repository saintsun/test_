import { HttpClient } from '@angular/common/http';
import { ServiceCrudBase } from '../../../shared/service-proxies/service-crud-base';
import { ProcessDto, ProcessSerializer } from '@shared/models/process-dto';
import { Injectable } from '@angular/core';

@Injectable()
export class ProcessesServiceProxy extends ServiceCrudBase<ProcessDto> {
    constructor(httpClient: HttpClient) {
        super(
            httpClient,
            'kpts/processes',
            new ProcessSerializer()
        );
    }
}
