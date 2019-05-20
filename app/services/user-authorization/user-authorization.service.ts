import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthorizationService {

  constructor() { }

  isAdmin() {
    if (sessionStorage.getItem('granted_permissions').includes('"action":"AdminPermission"')) {
      return true;
    } else {
      return false;
    }
  }

  isSuperAdmin() {
    if (sessionStorage.getItem('granted_permissions').includes('"action":"SuperAdminPermission"')) {
      return true;
    } else {
      return false;
    }
  }
}
