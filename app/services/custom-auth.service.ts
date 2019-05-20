import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPermissionsDto, UserPermissionsSerializer } from '@shared/models/user-permissions-dto';
import { ApiResponse } from '@shared/models/api-response';
import { ServiceClientBase } from '@shared/service-proxies/service-client-base';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomAuthService extends ServiceClientBase {

  constructor(httpClient: HttpClient) {
    super(httpClient, new UserPermissionsSerializer(), 'http://yourbaseurl.com')
  }

  getPermissions(registerId: string): Observable<ApiResponse> {
    return this.get<UserPermissionsDto[]>(
      'ums/GetUserPermissions/' + registerId
    );
  }
}
