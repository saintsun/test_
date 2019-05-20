import { Component, Injector, ViewChild } from '@angular/core';
import { ProcessesServiceProxy } from '@app/demo/services/processes-service-proxy';
import { ApiResponse } from '@shared/models/api-response';
import { PagedListingComponentBase } from '@shared/paged-listing-component-base';
import { ProcessDto } from '@shared/models/process-dto';
import { ModalProcessesComponent } from '../processes/modal-processes/modal-processes.component';
import { PdfService } from '@app/services/pdf/pdf.service';
import { SimpleGridComponent } from '@app/components/ag-grids/simple-grid/simple-grid.component';
import { ActionButton } from '@app/components/ag-grids/action-buttons/action-button';
import { ExcelService } from '@app/services/excel/excel.service';
import { DateService } from '@app/services/date/date.service';

@Component({
  selector: 'app-grid-sample',
  templateUrl: './grid-sample.component.html',
  styleUrls: ['./grid-sample.component.css']
})
export class GridSampleComponent extends PagedListingComponentBase<ProcessDto> {

  @ViewChild('processModal') modal: ModalProcessesComponent;
  gridColumnDefs = [];
  gridRowData = [];
  gridPageSize = 10;
  gridStyle = { 'width': '100%', 'height': '100%' };
  gridOnBtExport;
  gridFullSearch = '';
  pageSizes = [5, 10, 50, 100, 500, 1000];
  gridApi: any;
  gridActionButtons = [];
  @ViewChild(SimpleGridComponent) simpleGrid: SimpleGridComponent;

  gridActionButtonEdit = 'edit';
  gridActionButtonDelete = 'delete';

  gridExtendTemplateFunction = function (params) {
    const data = params.node.data;

    const template =
      '<div class="full-width-panel"><div class="full-width-summary"> ' +
      '<span class="full-width-title"> ' + data.processCode + ' </span><br/>' +
      '<label><b>Price:</b>' + data.processName + '</label><br/>' +
      '<label><b>Description:</b> ' + data.supplier + '</label><br/> ' +
      '</div> <div class="full-width-center"> ' +
      '<p>Statik Datas</p> ' +
      '</div></div>';

    return template;
  };

  constructor(
    injector: Injector,
    private pdfService: PdfService,
    private processService: ProcessesServiceProxy,
    private excelService: ExcelService,
    private dateService: DateService) {
    super(injector);

    this.gridColumnDefs = [
      {
        headerName: 'Parent Process Code', field: 'parentProcessCode',
        checkboxSelection: function (params) {
          return params.columnApi.getRowGroupColumns().length === 0;
        },
        headerCheckboxSelection: function (params) {
          return params.columnApi.getRowGroupColumns().length === 0;
        },
        filter: 'agTextColumnFilter',
        cellRenderer: 'agGroupCellRenderer',
        cellRendererParams: {
          innerRenderer: function (params) {
            return '<span style="cursor: default;">' + params.value + '</span>';
          }
        }
      },
      {
        headerName: 'Created Date', field: 'createdDate', filter: 'agDateColumnFilter',
        cellRenderer: (data) => {
          if (typeof data !== 'undefined') {
            return dateService.checkDateTime(data.value)
          }

          return '';
        }
      },
      { headerName: 'Process Code', field: 'processCode', filter: 'agTextColumnFilter' },
      { headerName: 'Process Name', field: 'processName', filter: 'agTextColumnFilter' },
      { headerName: 'Supplier', field: 'supplier', filter: 'agSetColumnFilter' },
      { headerName: 'Input', field: 'input', filter: 'agSetColumnFilter' },
      { headerName: 'Output', field: 'output', filter: 'agTextColumnFilter' },
      { headerName: 'Customer', field: 'customer', filter: 'agTextColumnFilter' },
      {
        headerName: 'Action', field: 'Action', cellRenderer: 'actionButtonsComponent',
        width: 100, filter: false, sortable: false, editable: false, cellStyle: { 'text-align': 'center' }
      }
    ];

    this.generateActionButtons();
  }

  protected ttInit(): void {
    // TODO: Init
  }

  protected onExcelExport() {
    const selectedRows = this.simpleGrid.gridApi.getSelectedRows();

    let cleanedData;

    if (typeof selectedRows !== 'undefined' && selectedRows.length > 0) {
      cleanedData = selectedRows.map(d => [
        d.parentProcessCode,
        this.dateService.checkDateTime(d.createdDate),
        d.processCode,
        d.processName,
        d.supplier,
        d.input,
        d.output,
        d.customer
      ]);

    } else {
      cleanedData = this.gridRowData.map(d => [
        d.parentProcessCode,
        this.dateService.checkDateTime(d.createdDate),
        d.processCode,
        d.processName,
        d.supplier,
        d.input,
        d.output,
        d.customer
      ]);
    }

    const tableHeaders: Array<string> = this.gridColumnDefs
      .filter(a => a.cellRenderer !== 'actionButtonsComponent' && a.headerName !== 'id')
      .map(x => x.headerName);

    this.excelService.generateExcelAndExport(cleanedData, tableHeaders);
  }

  protected onQuickFilterChanged() {
    this.simpleGrid.onQuickFilterChanged();
  }

  protected simpleExportToPdf() {
    const selectedRows = this.simpleGrid.gridApi.getSelectedRows();

    let cleanedData;

    if (typeof selectedRows !== 'undefined' && selectedRows.length > 0) {
      cleanedData = selectedRows.map(d => [
        d.parentProcessCode,
        this.dateService.checkDateTime(d.createdDate),
        d.processCode,
        d.processName,
        d.supplier,
        d.input,
        d.output,
        d.customer
      ]);
    } else {
      cleanedData = this.gridRowData.map(d => [
        d.parentProcessCode,
        this.dateService.checkDateTime(d.createdDate),
        d.processCode,
        d.processName,
        d.supplier,
        d.input,
        d.output,
        d.customer
      ]);
    }

    const tableHeaders: Array<string[]> = this.gridColumnDefs
      .filter(a => a.cellRenderer !== 'actionButtonsComponent' && a.headerName !== 'id')
      .map(x => x.headerName);

    this.pdfService.createSimplePdf(tableHeaders, cleanedData, 'SimpleData');
  }

  protected advancedExportToPdf() {
    const selectedRows = this.simpleGrid.gridApi.getSelectedRows();

    let cleanedData;

    if (typeof selectedRows !== 'undefined' && selectedRows.length > 0) {
      cleanedData = selectedRows.map(d => [
        d.parentProcessCode,
        this.dateService.checkDateTime(d.createdDate),
        d.processCode,
        d.processName,
        d.supplier,
        d.input,
        d.output,
        d.customer
      ]);
    } else {
      cleanedData = this.gridRowData.map(d => [
        d.parentProcessCode,
        this.dateService.checkDateTime(d.createdDate),
        d.processCode,
        d.processName,
        d.supplier,
        d.input,
        d.output,
        d.customer
      ]);
    }

    const tableHeaders: Array<string[]> = this.gridColumnDefs
      .filter(a => a.cellRenderer !== 'actionButtonsComponent' && a.headerName !== 'id')
      .map(x => x.headerName);

    this.pdfService.createAdvancedPdf(tableHeaders, cleanedData, 'Turkish Technic Report Sample');
  }

  protected list(): void {
    this.processService.list().subscribe((response: ApiResponse) => {
      this.gridRowData = response.result;

      // görünmesini istediğiniz row bazlı actionları böyle eklemelisiniz
      // buradaki virgülle ayrılmış string veriler yukarıda eklenen action butonların name alanlarıdır.
      this.gridRowData.forEach(element => {
        element.showActions = `${this.gridActionButtonEdit},${this.gridActionButtonDelete}`;
      });
    });
  }

  gridOpenCreateModal(): void {
    this.modal.show();
  }

  editProcess(process: ProcessDto): void {

  }

  protected edit(actionButtonParam) {
    const thisComponent = actionButtonParam.context.mainComponent;

    thisComponent.modal.show(actionButtonParam.node.data);
  }

  protected delete(actionButtonParam): void {
    const thisComponent = actionButtonParam.context.mainComponent;

    abp.message.confirm(
      'Delete:"' + actionButtonParam.node.data.processName + '" ?',
      (result: boolean) => {
        if (result) {
          thisComponent.processService.deleteById(actionButtonParam.node.data.id).subscribe(() => {
            thisComponent.notify.success('Deleted Successfully', 'Deleted', { positionClass: 'toast-top-right' });
            thisComponent.refresh();
          })
        }
      }
    );
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
    actionButton.name = this.gridActionButtonDelete;
    actionButton.icon = 'fa fa-trash-o';
    actionButton.title = 'delete';
    actionButton.method = this.delete;
    this.gridActionButtons.push(actionButton);
  }
}