import { Injectable } from '@angular/core';
import { SafetyCultureHistoryDto, SafetyCultureHistorySerializer } from '../models/dto-models/safety-culture-history-dto';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { HttpClient } from '@angular/common/http';
import { IconService } from '@app/services/icon/icon.service';
import { SearchModelDto } from '@shared/models/search-model-dto';

@Injectable()
export class SafetyCultureHistoryProxyService extends ServiceCrudBase<SafetyCultureHistoryDto> {
    constructor(httpClient: HttpClient, iconService: IconService) {
        super(
            httpClient,
            'SafetyCultureHistory',
            new SafetyCultureHistorySerializer(iconService)
        );
    }

    createWithFormData(formData: FormData) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return this.postWithFormData(formData, 'ekvt/SafetyCulture?UserId=' + currentUser.registerId);
    }

    getListWithPost(requestData: SearchModelDto[]) {
        return this.postForSearchOfT<SafetyCultureHistoryDto[]>(requestData, 'ekvt/SafetyCultures/Logs/Search?pagesize=99999999&pagenumber=1&sort=-Id');
    }
} 
