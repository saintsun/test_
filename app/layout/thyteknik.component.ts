import { Component, OnInit, Injector, ViewEncapsulation } from '@angular/core';
import { ProfilePhotoServiceProxy, UserServiceProxy } from '@shared/service-proxies/user-service-proxy'
import { AppConsts } from '@shared/AppConsts';
import { MenuDirection } from '@shared/models/user-permissions-dto';
import { Tab } from './thyteknik.layout.tab';
import { FormControl } from '@angular/forms';
import * as _ from 'lodash';
import { MenuItem } from '@shared/layout/menu-item';
import { RootLayout } from '.pages/@pages/layouts';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiResponse } from '@shared/models/api-response';
import { CustomAuthService } from '@app/services/custom-auth.service';

@Component({
  selector: 'thyteknik-layout',
  templateUrl: './thyteknik.component.html',
  styleUrls: ['./thyteknik.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ThyTeknikComponent extends RootLayout implements OnInit {

  shownLoginName: string = '';
  profilePhoto: string = '';
  tabs: Tab[] = [];
  tab: Tab;
  selected = new FormControl(0);
  menuLinks = [];

  constructor(
    injector: Injector,
    private _userService: UserServiceProxy,
    private _profilePhotoService: ProfilePhotoServiceProxy,
    private _sanitizer: DomSanitizer,
    private _customAuthService: CustomAuthService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.silentRenewToken();
    this.shownLoginName = this.authService.getShownLoginName();
    this.getProfilePhoto();
    this.getPermissions();
  }

  silentRenewToken(): void {
    setInterval(() => {
      this.authService.getNewToken().subscribe((response) => {
        this.authService.currentUser.access_token = response.access_token;
        this.authService.currentUser.expires_at += response.expires_in;
        this.authService.mgr.storeUser(this.authService.currentUser);
      })
    }, AppConsts.accessTokenSilentTime * 60 * 1000)
  }

  logout(): void {
    this.authService.startSignoutMainWindow();
  }

  getProfilePhoto(): void {
    this._profilePhotoService.getProfilePhoto(this.authService.currentUser.profile.register_id).subscribe((result) => {
      if (result.success) {
        this.profilePhoto = 'data:image/gif;base64,' + result.result.photo;
      } else {
        this.profilePhoto = '../../../assets/images/user.png';
      }
    });
  }

  getPermissions(): void {
    if (AppConsts.useCustomAuth) {
      this._customAuthService.getPermissions(this.authService.currentUser.profile.register_id).subscribe((permissions: ApiResponse) => {
        this.initPermission(permissions);
      })
    } else {
      this._userService.getPermissions(this.authService.currentUser.profile.register_id).subscribe((permissions: ApiResponse) => {
        this.initPermission(permissions);
      })
    }
  }

  private initPermission(permissions: ApiResponse) {
    const currentProjectItems = permissions.result.filter(perm => perm.projectName === AppConsts.projectName);
    // all
    sessionStorage.setItem(AppConsts.allItems, JSON.stringify(currentProjectItems));
    // permissions
    sessionStorage.setItem(
      AppConsts.grantedPermissions,
      JSON.stringify(currentProjectItems.filter(perm => perm.menuDirection === MenuDirection.Permission)));
    // menus
    const menus = currentProjectItems.filter(perm => perm.menuDirection === MenuDirection.Menu ||
      perm.menuDirection === MenuDirection.LinkMenu ||
      perm.menuDirection === MenuDirection.ParentMenu);
    const parents = _.filter(menus, m => m.parentId === 0);
    parents.forEach(m => {
      const menu = new MenuItem(m.id, m.displayName, '', m.area, m.icon, m.url, [], m.parentId, m.controller);
      this.menuLinks.push(menu);
    });
    this.menuArrange(_.filter(menus, m => m.parentId !== 0), this.menuLinks);
    sessionStorage.setItem(AppConsts.grantedMenus, JSON.stringify(menus));
  }

  menuArrange(menus, parents): void {
    const subMenus = [];

    _.forEach(menus, item => {
      const menu = new MenuItem(item.id, item.displayName, '', item.area, item.icon, item.url, [], item.parentId, item.controller);
      const parent = _.find(parents, p => p.id === item.parentId);
      if (parent !== undefined) {
        parent.submenu.push(menu);
      } else {
        subMenus.push(item);
      }
    });

    if (subMenus.length === 0) {
      return;
    } else {
      this.menuArrange(subMenus, menus);
    }
  }

  openTab(menuItem: MenuItem): void {
    this.tab = new Tab();
    this.tab.componentName = menuItem.componentName;
    this.selected.setValue(this.tabs.length);
    this.tab.headerText = menuItem.componentName;

    this.tabs.push(this.tab);
  }

  removeTab(index: number): void {
    this.tabs.splice(index, 1);
  }
}
