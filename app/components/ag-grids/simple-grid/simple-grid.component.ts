import { Component, OnInit, Input, SimpleChanges, SimpleChange, OnChanges, Injector } from '@angular/core';
// import 'ag-grid-enterprise';
import { AppComponentBase } from '@shared/app-component-base';
import { ActionButtonsComponent } from '../action-buttons/action-buttons.component';

@Component({
  selector: 'app-simple-grid',
  templateUrl: './simple-grid.component.html',
  styleUrls: ['./simple-grid.component.css']
})
export class SimpleGridComponent extends AppComponentBase implements OnChanges, OnInit {
  @Input() gridColumnDefs: any;
  @Input() gridRowData: any[];
  @Input() gridExportExcel = false;
  @Input() gridFullSearchInside = false;
  @Input() gridPageSize = 10;
  @Input() currentMainComponent;
  @Input() gridStyle = { 'width': '100%', 'height': '100%' };
  @Input() gridShowCreateButton = false;
  @Input() gridFullSearch;
  @Input() gridActionButtons = [];

  public gridApi;
  private gridParams;
  private gridColumnApi;

  private columnDefs;
  private defaultColDef;
  private rowSelection;
  private rowGroupPanelShow;
  private rowData: any[];

  private frameworkComponents;
  private context;

  private isFullWidthCell;
  private fullWidthCellRenderer;
  private getRowHeight;
  private doesDataFlower;

  constructor(injector: Injector) {
    super(injector);

    this.isFullWidthCell = function (rowNode) {
      const rowIsNestedRow = rowNode.flower;

      return rowIsNestedRow;
    };
  }

  ngOnInit() {
    this.frameworkComponents = { actionButtonsComponent: ActionButtonsComponent };
    this.context = {
      buttons: this.gridActionButtons,
      mainComponent: this.currentMainComponent
    };

    this.columnDefs = this.gridColumnDefs;

    this.defaultColDef = {
      editable: false,
      enableValue: true,
      sortable: true,
      resizable: true,
      filter: true,
      suppressMenu: true,
      menuTabs: [] // hide menu Tabs
    };
    this.rowSelection = 'multiple';

    if (typeof this.currentMainComponent !== 'undefined' && typeof this.currentMainComponent.gridExtendTemplateFunction !== 'undefined') {
      this.fullWidthCellRenderer = getFullWidthCellRenderer(this.currentMainComponent.gridExtendTemplateFunction);

      this.getRowHeight = function (params) {
        const rowIsNestedRow = params.node.flower;

        return rowIsNestedRow ? 100 : 25;
      };

      this.doesDataFlower = function (dataItem) {
        return true;
      };
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const rowData: SimpleChange = changes.gridRowData;

    if (typeof rowData !== 'undefined' && rowData.previousValue !== rowData.currentValue) {
      this.rowData = rowData.currentValue;
    }

    const pageSize: SimpleChange = changes.gridPageSize;
    if (typeof pageSize !== 'undefined' && pageSize.currentValue !== pageSize.previousValue) {
      this.gridPageSize = pageSize.currentValue;

      if (typeof this.gridApi !== 'undefined') {
        this.gridApi.paginationSetPageSize(Number(this.gridPageSize));
        this.gridApi.paginationGoToPage(0);
      }
    }
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    this.gridColumnApi = params.columnApi;
  }

  onQuickFilterChanged() {
    this.gridApi.setQuickFilter(this.gridFullSearch);
  }
}

function getFullWidthCellRenderer(gridExtendTemplateFunction) {
  function FullWidthCellRenderer() { }
  FullWidthCellRenderer.prototype.init = function (params) {
    const eTemp = document.createElement('div');
    eTemp.innerHTML = this.getTemplate(params);

    this.eGui = eTemp.firstElementChild;
    this.consumeMouseWheelOnCenterText();
  };

  FullWidthCellRenderer.prototype.getTemplate = gridExtendTemplateFunction;

  FullWidthCellRenderer.prototype.getGui = function () {
    return this.eGui;
  };

  FullWidthCellRenderer.prototype.consumeMouseWheelOnCenterText = function () {
    const eFullWidthCenter = this.eGui.querySelector('.full-width-center');

    const mouseWheelListener = function (event) {
      event.stopPropagation();
    };

    eFullWidthCenter.addEventListener('mousewheel', mouseWheelListener);
    eFullWidthCenter.addEventListener('DOMMouseScroll', mouseWheelListener);
  };

  return FullWidthCellRenderer;
}
