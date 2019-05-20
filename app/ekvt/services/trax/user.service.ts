import { Injectable } from '@angular/core';
import { ServiceCrudBase } from '@shared/service-proxies/service-crud-base';
import { HttpClient } from '@angular/common/http';
import { UserDto, UserSerializer } from '@app/ekvt/models/utils/user-dto';
import { Observable } from 'rxjs';
import { ApiResponse } from '@shared/models/api-response';
import { SearchModelDto } from '@shared/models/search-model-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ServiceCrudBase<UserDto> {

  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      'ekvt/RegisterSearch',
      new UserSerializer());
  }

  getUsersWithPost(requestData: SearchModelDto[]): Observable<ApiResponse> {
    return this.postForSearchOfT<UserDto[]>(requestData, 'ekvt/Employees/Registers?pagesize=99999999&pagenumber=1');
  }
}