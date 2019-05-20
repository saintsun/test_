import { Component, Injector, ViewChild, OnInit } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { ProcessDto } from '@shared/models/process-dto';
import { ProcessesServiceProxy } from '@app/demo/services/processes-service-proxy';
import { ModalProcessesComponent } from './modal-processes/modal-processes.component';
import { ApiResponse } from '@shared/models/api-response';
import { ActionButtonsComponent } from '@app/components/ag-grids/action-buttons/action-buttons.component';

@Component({
    selector: 'app-processes',
    templateUrl: './processes.component.html'
})

export class ProcessesComponent extends PagedListingComponentBase<ProcessDto> implements OnInit {

    @ViewChild('processModal') modal: ModalProcessesComponent;
    private frameworkComponents;
    private context;
    columnDefs = [
        { headerName: 'Action', field: 'Action', cellRenderer: 'actionButtonsComponent', width: 100 },
        { headerName: 'Parent Process Code', field: 'parentProcessCode' },
        { headerName: 'Process Code', field: 'processCode' },
        { headerName: 'Process Name', field: 'processName' },
        { headerName: 'Supplier', field: 'supplier' },
        { headerName: 'Input', field: 'input' },
        { headerName: 'Output', field: 'output' },
        { headerName: 'Customer', field: 'customer' }
    ];
    processes = [] as ProcessDto[];

    constructor(injector: Injector,
        private processService: ProcessesServiceProxy) {
        super(injector);
        this.frameworkComponents = { actionButtonsComponent: ActionButtonsComponent };
        this.context = { componentParent: this };
    }

    protected ttInit(): void {
        // TODO: Init
    }

    protected list(): void {
        this.processService.list().subscribe((response: ApiResponse) => {
            this.processes = response.result;
            this.showPaging(response.totalCount, 1);
        })
    }

    protected delete(entity: ProcessDto): void {
        this.processService.deleteById(entity.id).subscribe(() => {
            this.notify.success('Deleted Successfully', 'Deleted', { positionClass: 'toast-top-right' });
            this.refresh();
        })
    }
    createProcess(): void {
        this.modal.show();
    }

    editProcess(process: ProcessDto): void {

    }

}
