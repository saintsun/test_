import { Component, Injector, ViewChild } from '@angular/core';
import { ApiResponse } from '@shared/models/api-response';
import { PagedListingComponentBase } from '@shared/paged-listing-component-base';
import { SimpleGridComponent } from '@app/components/ag-grids/simple-grid/simple-grid.component';
import { ActionButton } from '@app/components/ag-grids/action-buttons/action-button';
import { SafetyCultureDto } from '@app/ekvt/models/dto-models/safety-culture-dto';
import { CreateOrUpdateDatabaseModalComponent } from './create-or-update-database-modal/create-or-update-database-modal.component';
import { ExcelService } from '@app/services/excel/excel.service';
import { DateService } from '@app/services/date/date.service';
import { PdfService } from '@app/services/pdf/pdf.service';
import { SafetyCultureProxyService } from '@app/ekvt/services/safety-culture-proxy.service';
import { AppConsts } from '@shared/AppConsts';
import { SafetyCultureAttachmentService } from '@app/ekvt/services/safety-culture-attachment/safety-culture-attachment.service';
import { SafetyCultureAttachmentDto } from '@app/ekvt/models/dto-models/safety-culture-attachment-dto';
import { SearchModelDto } from '@shared/models/search-model-dto';
import { UserAuthorizationService } from '@app/services/user-authorization/user-authorization.service';
import { AuthService } from '@shared/auth/auth.service';
import { AttachmentModalComponent } from '../attachment-modal/attachment-modal.component';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent extends PagedListingComponentBase<SafetyCultureDto> {

  isAdmin;
  isSuperAdmin;
  @ViewChild('attachModal') modal2: AttachmentModalComponent;
  @ViewChild('databaseModal') modal: CreateOrUpdateDatabaseModalComponent;
  gridColumnDefs = [];
  gridRowData = [];
  gridPageSize = 10;
  gridStyle = { 'width': '100%', 'height': '102%' };
  gridOnBtExport;
  gridFullSearch = '';
  gridContentRecieved = false;
  gridContentFiles = [];
  pageSizes = [5, 10, 50, 100, 500, 1000];
  gridActionButtons = [];
  apiBaseUrl = AppConsts.apiBaseUrl;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  traxUser = JSON.parse(localStorage.getItem('TraxUser'));

  @ViewChild(SimpleGridComponent) simpleGrid: SimpleGridComponent;

  gridActionButtonEdit = 'edit';
  gridActionButtonAttachments = 'attachments';

  constructor(injector: Injector,
    private pdfService: PdfService,
    private safetyCultureService: SafetyCultureProxyService,
    private excelService: ExcelService,
    private safetyCultureAttachmentService: SafetyCultureAttachmentService,
    private dateService: DateService,
    private userAuthService: UserAuthorizationService,
  ) {
    super(injector);

    this.isAdmin = userAuthService.isAdmin();
    this.isSuperAdmin = userAuthService.isSuperAdmin();

    this.gridColumnDefs = [
      {
        headerName: 'ID', field: 'id',
        checkboxSelection: function (params) {
          return params.columnApi.getRowGroupColumns().length === 0;
        },
        headerCheckboxSelection: function (params) {
          return params.columnApi.getRowGroupColumns().length === 0;
        },
        filter: 'agTextColumnFilter',
        pinned: 'left'
      },

      // Row Columns
      {
        headerName: 'Name-Surname / Ad-Soyad', field: 'fullName', filter: 'agTextColumnFilter',
        pinned: 'left'
      },
      {
        headerName: 'Personnel ID / Sicil', field: 'registryId', filter: 'agTextColumnFilter',
        pinned: 'left'
      },
      { headerName: 'Directorate / Başkanlık', field: 'directorUnit', filter: 'agTextColumnFilter' },
      { headerName: 'Management / Müdürlük', field: 'managerUnit', filter: 'agTextColumnFilter' },
      { headerName: 'Unit / Şeflik', field: 'chiefUnit', filter: 'agTextColumnFilter' },
      { headerName: 'Title / Ünvan', field: 'positionDescription', filter: 'agTextColumnFilter' },
      {
        headerName: 'Date / Tarih', field: 'incidentDate', filter: 'agDateColumnFilter',
        cellRenderer: (data) => {
          if (typeof data !== 'undefined') {
            return dateService.checkDateTime(data.value)
          }
          return '';
        }
      },
      { headerName: 'Domestic-Abroad  / Yurt İçi-Yurt Dışı', field: 'domestic.label', filter: 'agTextColumnFilter' },
      { headerName: 'Location / Lokasyon', field: 'location.label', filter: 'agTextColumnFilter' },
      { headerName: 'Incident / Olay', field: 'incident', filter: 'agTextColumnFilter' },
      { headerName: 'Result / Sonuç', field: 'result', filter: 'agTextColumnFilter' },
      { headerName: 'Actions / Alınan Aksiyonlar', field: 'action', filter: 'agTextColumnFilter' },


      // Actions
      {
        headerName: 'Action', field: 'Action', cellRenderer: 'actionButtonsComponent',
        width: 160, filter: false, sortable: false, editable: false, cellStyle: { 'text-align': 'center' },
        pinned: 'right', resizable: false
      }
    ];

    this.generateActionButtons();
  }

  protected ttInit(): void {

  }

  protected onExcelExport() {
    const selectedRows = this.simpleGrid.gridApi.getSelectedRows();

    let cleanedData;

    if (typeof selectedRows !== 'undefined' && selectedRows.length > 0) {
      cleanedData = selectedRows.map(d => [
        d.id,
        d.fullName,
        d.registryId,
        d.directorUnit,
        d.managerUnit,
        d.chiefUnit,
        d.positionDescription,
        this.dateService.checkDateTime(d.incidentDate),
        d.domestic.label,
        d.location.label,
        d.incident,
        d.result,
        d.action
      ]);

    } else {
      cleanedData = this.gridRowData.map(d => [
        d.id,
        d.fullName,
        d.registryId,
        d.directorUnit,
        d.managerUnit,
        d.chiefUnit,
        d.positionDescription,
        this.dateService.checkDateTime(d.incidentDate),
        d.domestic.label,
        d.location.label,
        d.incident,
        d.result,
        d.action
      ]);
    }

    const tableHeaders: Array<string> = this.gridColumnDefs
      .filter(a => a.cellRenderer !== 'actionButtonsComponent' && a.headerName !== 'id')
      .map(x => x.headerName);

    this.excelService.generateExcelAndExport(cleanedData, tableHeaders, 'SafetyCulture', 'Database');
  }

  protected exportToPdf() {
    const selectedRows = this.simpleGrid.gridApi.getSelectedRows();

    let cleanedData;

    if (typeof selectedRows !== 'undefined' && selectedRows.length > 0) {
      cleanedData = selectedRows.map(d => [
        d.fullName,
        d.registryId,
        d.directorUnit,
        d.managerUnit,
        d.chiefUnit,
        d.positionDescription,
        this.dateService.checkDateTime(d.incidentDate),
        d.domestic.label,
        d.location.label,
        // d.incident,
        // d.result,
        // d.action
      ]);
    } else {
      cleanedData = this.gridRowData.map(d => [
        d.fullName,
        d.directorUnit,
        d.managerUnit,
        d.chiefUnit,
        d.positionDescription,
        this.dateService.checkDateTime(d.incidentDate),
        d.domestic.label,
        d.location.label,
        // d.incident,
        // d.result,
        // d.action
      ]);
    }

    const tableHeaders: Array<string[]> =
      [['Name-Surname'], ['Directorate'], ['Management'], ['Unit'], ['Title'], ['Date'], ['Domestic-Abroad '], ['Location']
        // , ['Incident'], ['Result'], ['Actions']
      ];


    this.pdfService.createAdvancedPdf(tableHeaders, cleanedData, 'Safety Culture');
  }

  protected onQuickFilterChanged() {
    this.simpleGrid.onQuickFilterChanged();
  }

  protected list(): void {
    const searchModels = [];
    // Admin veya Süper Adminse
    if (this.isSuperAdmin || this.isAdmin ||
      // Kalite Güvence Başkanlığında Müdür veya Başkansa
      (this.traxUser !== undefined && this.traxUser !== null && this.traxUser.user.directorUnitCode === '10011610' &&
        (this.traxUser.user.employeeSubGroup === '35' || this.traxUser.user.employeeSubGroup === '25')) ||
      // Genel Müdür veya Genel Müdür Yardımcısıysa
      (this.traxUser !== undefined && this.traxUser !== null &&
        (this.traxUser.user.employeeSubGroup === '20' || this.traxUser.user.employeeSubGroup === '15'))) {

      // Filtresiz Bütün Kaydı Getir
      this.getDatabaseList(searchModels);
    } else {

      // Usersa
      if (this.traxUser !== undefined && this.traxUser !== null &&
        this.traxUser.user.employeeSubGroup === '25') {

        // Başkansa
        const searchModel: SearchModelDto = new SearchModelDto();

        searchModel.value = this.traxUser.user.directorUnitCode;
        searchModel.operator = '=';
        searchModel.fieldName = 'DIRECTOR_UNIT_CODE';
        searchModels.push(searchModel);
      } else if (this.traxUser !== undefined && this.traxUser !== null &&
        this.traxUser.user.employeeSubGroup === '35') {

        // Müdürse
        const searchModel: SearchModelDto = new SearchModelDto();

        searchModel.value = this.traxUser.user.managerUnit;
        searchModel.operator = '=';
        searchModel.fieldName = 'MANAGER_UNIT_CODE';
        searchModels.push(searchModel);
      } else {
        const searchModel: SearchModelDto = new SearchModelDto();

        searchModel.value = this.currentUser.registerId;
        searchModel.operator = '=';
        searchModel.fieldName = 'REGISTRY_ID';
        searchModels.push(searchModel);
      }

      this.getDatabaseList(searchModels);
    }
  }

  private getDatabaseList(searchModels: any[]) {
    this.safetyCultureService.getListWithPost(searchModels).subscribe((response: ApiResponse) => {
      this.gridRowData = response.result;
      // görünmesini istediğiniz row bazlı actionları böyle eklemelisiniz
      // buradaki virgülle ayrılmış string veriler yukarıda eklenen action butonların name alanlarıdır.
      if (this.isSuperAdmin || this.isAdmin) {
        this.gridRowData.forEach(element => {
          element.showActions = `${this.gridActionButtonEdit},${this.gridActionButtonAttachments}`;
        });
      } else {
        this.gridRowData.forEach(element => {
          element.showActions = `${this.gridActionButtonAttachments}`;
        });
      }
    });
  }

  gridOpenCreateModal(): void {
    this.modal.show();
  }

  editProcess(safety: SafetyCultureDto): void {

  }

  protected edit(actionButtonParam) {
    const thisComponent = actionButtonParam.context.mainComponent;
    thisComponent.modal.show(actionButtonParam.node.data);
  }

  protected attachments(actionButtonParam) {
    const thisComponent = actionButtonParam.context.mainComponent;
    thisComponent.modal2.show(actionButtonParam.node.data);
  }

  protected delete(actionButtonParam): void {
  }

  private generateActionButtons() {
    let actionButton = new ActionButton();
    actionButton.name = this.gridActionButtonEdit;
    actionButton.icon = 'fa fa-pencil-square-o';
    actionButton.title = 'edit';
    actionButton.class = 'ml-2';
    actionButton.method = this.edit;
    this.gridActionButtons.push(actionButton);

    actionButton = new ActionButton();
    actionButton.name = this.gridActionButtonAttachments;
    actionButton.icon = 'fa fa-paperclip';
    actionButton.title = 'attachments';
    actionButton.class = 'ml-2';
    actionButton.method = this.attachments;
    this.gridActionButtons.push(actionButton);
  }
}
