import { HttpClient } from '@angular/common/http';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { Injectable } from '@angular/core';
import { SafetyCultureSerializer, SafetyCultureDto } from '@app/ekvt/models/dto-models/safety-culture-dto';
import { IconService } from '@app/services/icon/icon.service';
import { SearchModelDto } from '@shared/models/search-model-dto';

@Injectable()
export class SafetyCultureProxyService extends ServiceCrudBase<SafetyCultureDto> {
    constructor(httpClient: HttpClient, iconService: IconService) {
        super(
            httpClient,
            'ekvt/SafetyCultures',
            new SafetyCultureSerializer(iconService)
        );
    }

    createWithRegisterId(data: any) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return this.post(data, 'ekvt/SafetyCultures?userId=' + currentUser.registerId);
    }

    updateWithRegisterId(data: any) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return this.put(data, 'ekvt/SafetyCultures/' + data.id + '?userId=' + currentUser.registerId);
    }

    getListWithPost(requestData: SearchModelDto[]) {
        return this.postForSearchOfT<SafetyCultureDto[]>(requestData, 'ekvt/SafetyCultures/Search?pagesize=99999999&pagenumber=1&sort=-Id')
    }
}

