import { Component, ViewChild, Injector } from '@angular/core';
import { PagedListingComponentBase } from '@shared/paged-listing-component-base';
import { SimpleGridComponent } from '@app/components/ag-grids/simple-grid/simple-grid.component';
import { PdfService } from '@app/services/pdf/pdf.service';
import { ExcelService } from '@app/services/excel/excel.service';
import { DateService } from '@app/services/date/date.service';
import { ApiResponse } from '@shared/models/api-response';
import { SafetyCultureDto } from '@app/ekvt/models/dto-models/safety-culture-dto';
import { SafetyCultureHistoryProxyService } from '@app/ekvt/services/safety-culture-history-proxy.service';
import { IconService } from '@app/services/icon/icon.service';
import { AppConsts } from '@shared/AppConsts';
import { SearchModelDto } from '@shared/models/search-model-dto';
import { ActionButton } from '@app/components/ag-grids/action-buttons/action-button';
import { AttachmentModalComponent } from '../attachment-modal/attachment-modal.component';
// tslint:disable-next-line:max-line-length
import { CreateOrUpdateDatabaseModalComponent } from '../database/create-or-update-database-modal/create-or-update-database-modal.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent extends PagedListingComponentBase<SafetyCultureDto> {

  gridColumnDefs = [];
  gridRowData = [];
  gridPageSize = 10;
  gridStyle = { 'width': '100%', 'height': '100%' };
  gridOnBtExport;
  gridFullSearch = '';
  pageSizes = [5, 10, 50, 100, 500, 1000];
  gridActionButtons = [];
  apiBaseUrl = AppConsts.apiBaseUrl;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  @ViewChild(SimpleGridComponent) simpleGrid: SimpleGridComponent;
  @ViewChild('databaseModal') modal: CreateOrUpdateDatabaseModalComponent;
  @ViewChild('attachModal') modal2: AttachmentModalComponent;
  gridActionButtonAttachments = 'attachments';

  constructor(injector: Injector,
    private pdfService: PdfService,
    private safetyCultureHistoryService: SafetyCultureHistoryProxyService,
    private excelService: ExcelService,
    private dateService: DateService,
    private iconService: IconService) {
    super(injector);

    this.gridColumnDefs = [
      {
        headerName: 'History ID', field: 'historyId',
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
        headerName: 'ID', field: 'id', filter: 'agTextColumnFilter', pinned: 'left'
      },
      {
        headerName: 'Name-Surname / Ad-Soyad', field: 'fullName', filter: 'agTextColumnFilter', pinned: 'left'
      },
      { headerName: 'Personnel ID / Sicil', field: 'registryId', filter: 'agTextColumnFilter', pinned: 'left' },
      { headerName: 'Directorate / Başkanlık', field: 'directorUnitCode', filter: 'agTextColumnFilter' },
      { headerName: 'Management / Müdürlük', field: 'managerUnitCode', filter: 'agTextColumnFilter' },
      { headerName: 'Unit / Şeflik', field: 'chiefUnitCode', filter: 'agTextColumnFilter' },
      { headerName: 'Title / Ünvan', field: 'positionDescription', filter: 'agTextColumnFilter' },
      {
        headerName: 'Date', field: 'incidentDate', filter: 'agDateColumnFilter',
        cellRenderer: (data) => {
          if (typeof data !== 'undefined') {
            return dateService.checkDateTime(data.value)
          }
          return '';
        }
      },
      { headerName: 'Domestic-Abroad  / Yurt İçin - Yurt Dışı', field: 'domestic', filter: 'agTextColumnFilter' },
      { headerName: 'Location / Lokasyon', field: 'location', filter: 'agTextColumnFilter' },
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
        d.historyId,
        d.id,
        d.fullName,
        d.registryId,
        d.directorUnitCode,
        d.managerUnitCode,
        d.chiefUnitCode,
        d.positionDescription,
        this.dateService.checkDateTime(d.incidentDate),
        d.domestic,
        d.location,
        d.incident,
        d.result,
        d.action
      ]);

    } else {
      cleanedData = this.gridRowData.map(d => [
        d.historyId,
        d.id,
        d.fullName,
        d.registryId,
        d.directorUnitCode,
        d.managerUnitCode,
        d.chiefUnitCode,
        d.positionDescription,
        this.dateService.checkDateTime(d.incidentDate),
        d.domestic,
        d.location,
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
        d.directorUnitCode,
        d.managerUnitCode,
        d.chiefUnitCode,
        d.positionDescription,
        this.dateService.checkDateTime(d.incidentDate),
        d.domestic,
        d.location,
        d.incident,
        d.result,
        d.action
      ]);
    } else {
      cleanedData = this.gridRowData.map(d => [
        d.fullName,
        d.directorUnitCode,
        d.managerUnitCode,
        d.chiefUnitCode,
        d.positionDescription,
        this.dateService.checkDateTime(d.incidentDate),
        d.domestic,
        d.location,
        d.incident,
        d.result,
        d.action
      ]);
    }

    // tslint:disable-next-line:max-line-length
    const tableHeaders: Array<string[]> = [['Name-Surname'], ['Directorate'], ['Management'], ['Unit'], ['Title'], ['Date'], ['Domestic-Abroad '], ['Location'], ['Incident'], ['Result'], ['Actions']];

    this.pdfService.createAdvancedPdf(tableHeaders, cleanedData, 'Safety Culture');
  }

  protected onQuickFilterChanged() {
    this.simpleGrid.onQuickFilterChanged();
  }

  protected list(): void {
    const searchModels = [];

    this.safetyCultureHistoryService.getListWithPost(searchModels).subscribe((response: ApiResponse) => {
      this.gridRowData = response.result;
    });
  }

  protected edit(actionButtonParam) {
    const thisComponent = actionButtonParam.context.mainComponent;
    thisComponent.modal.show(actionButtonParam.node.data);
  }

  protected delete(actionButtonParam): void {

  }

  protected attachments(actionButtonParam) {
    const thisComponent = actionButtonParam.context.mainComponent;
    thisComponent.modal2.show(actionButtonParam.node.data);
  }

  private generateActionButtons() {
    let actionButton = new ActionButton();
    actionButton = new ActionButton();
    actionButton.name = this.gridActionButtonAttachments;
    actionButton.icon = 'fa fa-paperclip';
    actionButton.title = 'attachments';
    actionButton.class = 'ml-2';
    actionButton.method = this.attachments;
    this.gridActionButtons.push(actionButton);
  }
}
