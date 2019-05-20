import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptors } from '@shared/interceptors/token.interceptors';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import {
    BsDropdownModule,
    AccordionModule,
    AlertModule,
    ButtonsModule,
    CollapseModule,
    ModalModule,
    ProgressbarModule,
    TabsModule,
    TooltipModule,
    TypeaheadModule
} from 'ngx-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AbpModule } from '@abp/abp.module';

import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';

import { ThyTeknikComponent } from '@app/layout/thyteknik.component';
import { SharedModule as PagesSharedModule } from '../.pages/@pages/components/shared.module';
import { SidebarComponent } from '../.pages/@pages/components/sidebar/sidebar.component';
import { HeaderComponent } from '../.pages/@pages/components/header/header.component';
import { pgTabsModule } from '../.pages/@pages/components/tabs/tabs.module';
import { TabPage1Component } from '../.pages/tab-page1/tab-page1.component';
import { TabPage2Component } from '../.pages/tab-page2/tab-page2.component';
import { SearchOverlayComponent } from '../.pages/@pages/components/search-overlay/search-overlay.component';
import { QuickviewComponent } from '../.pages/@pages/components/quickview/quickview.component';
import { QuickviewService } from '../.pages/@pages/components/quickview/quickview.service';
import { HorizontalMenuComponent } from '../.pages/@pages/components/horizontal-menu/horizontal-menu.component';
import { pgListViewModule } from '../.pages/@pages/components/list-view/list-view.module';
import { pgCardModule } from '../.pages/@pages/components/card/card.module';
import { pgCardSocialModule } from '../.pages/@pages/components/card-social/card-social.module';

import { QuillModule } from 'ngx-quill';
// Layout Service - Required
import { pagesToggleService } from '../.pages/@pages/services/toggler.service';
import { AgGridModule } from 'ag-grid-angular';
import { SimpleGridComponent } from './components/ag-grids/simple-grid/simple-grid.component';
import { ActionButtonsComponent } from './components/ag-grids/action-buttons/action-buttons.component';
import { GridSampleComponent } from './demo/grid-sample/grid-sample.component';
import { ProcessesComponent } from './demo/processes/processes.component';
import { ModalProcessesComponent } from './demo/processes/modal-processes/modal-processes.component';
import { NotifySampleComponent } from './demo/notify-sample/notify-sample..component';
import { FormsPageModule } from '.pages/forms/forms.module';
import { TtFormElementsComponent } from './demo/forms/tt-form-elements/tt-form-elements.component';
import { TtColorComponent } from './demo/ui-elements/tt-color/tt-color.component';
import { TtTypographyComponent } from './demo/ui-elements/tt-typography/tt-typography.component';
import { TtIconsComponent } from './demo/ui-elements/tt-icons/tt-icons.component';
import { TtButtonsComponent } from './demo/ui-elements/tt-buttons/tt-buttons.component';
import { TtModalsComponent } from './demo/ui-elements/tt-modals/tt-modals.component';
import { TtTabsAccordionsComponent } from './demo/ui-elements/tt-tabs-accordions/tt-tabs-accordions.component';
import { TtTreeViewComponent } from './demo/ui-elements/tt-tree-view/tt-tree-view.component';
import { TtCardsComponent } from './demo/cards/tt-cards/tt-cards.component';
import { TtNotificationsComponent } from './demo/ui-elements/tt-notifications/tt-notifications.component';
import { DatabaseComponent } from './ekvt/views/database/database.component';
// tslint:disable-next-line: max-line-length
import { CreateOrUpdateDatabaseModalComponent } from './ekvt/views/database/create-or-update-database-modal/create-or-update-database-modal.component';
import { HistoryComponent } from './ekvt/views/history/history.component';
import { AttachmentModalComponent } from './ekvt/views/attachment-modal/attachment-modal.component';
import { AccountModule } from 'account/account.module';

@NgModule({
    declarations: [
        AppComponent,
        ThyTeknikComponent,
        SidebarComponent,
        QuickviewComponent,
        SearchOverlayComponent,
        HeaderComponent,
        HorizontalMenuComponent,
        TabPage1Component,
        TabPage2Component,
        GridSampleComponent,
        ProcessesComponent,
        ModalProcessesComponent,
        ActionButtonsComponent,
        SimpleGridComponent,
        NotifySampleComponent,
        TtFormElementsComponent,
        TtColorComponent,
        TtTypographyComponent,
        TtIconsComponent,
        TtButtonsComponent,
        TtModalsComponent,
        TtTabsAccordionsComponent,
        TtTreeViewComponent,
        TtCardsComponent,
        TtNotificationsComponent,
        DatabaseComponent,
        CreateOrUpdateDatabaseModalComponent,
        HistoryComponent,
        AttachmentModalComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        JsonpModule,
        BsDropdownModule.forRoot(),
        AccordionModule.forRoot(),
        AlertModule.forRoot(),
        ButtonsModule.forRoot(),
        CollapseModule.forRoot(),
        ModalModule.forRoot(),
        ProgressbarModule.forRoot(),
        TabsModule.forRoot(),
        TooltipModule.forRoot(),
        TypeaheadModule.forRoot(),
        AbpModule,
        AppRoutingModule,
        ServiceProxyModule,
        SharedModule,
        NgxPaginationModule,
        PagesSharedModule,
        pgTabsModule,
        QuillModule,
        pgListViewModule,
        pgCardModule,
        pgCardSocialModule,
        AgGridModule.withComponents([ActionButtonsComponent]),
        NgxUiLoaderModule,
        FormsPageModule,
        AccountModule
    ],
    providers: [
        pagesToggleService,
        QuickviewService,
        // IconsService,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptors, multi: true }
    ]
})
export class AppModule { }
