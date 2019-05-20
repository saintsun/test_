import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProcessDto } from '@shared/models/process-dto';

import { ModalDirective, BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import { ProcessesServiceProxy } from '@app/demo/services/processes-service-proxy';
@Component({
    selector: 'processes-modal',
    templateUrl: './modal-processes.component.html'
})

export class ModalProcessesComponent extends AppComponentBase implements OnInit {
    modalRef: BsModalRef;
    processForm: FormGroup;
    process = new ProcessDto;
    isCreate = true;

    @ViewChild('processModal') modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    constructor(injector: Injector, private modalService: BsModalService,
        private processService: ProcessesServiceProxy) {
        super(injector);
    }
    ngOnInit(): void {
        this.processForm = new FormGroup({
            'id': new FormControl(''),
            'parentProcessCode': new FormControl(this.process.parentProcessCode, [
                Validators.required,
                Validators.minLength(3)
            ]),
            'processCode': new FormControl(this.process.processCode, [
                Validators.required,
                Validators.minLength(3)
            ]),
            'processName': new FormControl(this.process.processName, [
                Validators.required,
                Validators.minLength(3)
            ]),
            'supplier': new FormControl(''),
            'input': new FormControl(''),
            'output': new FormControl(''),
            'createdDate': new FormControl(''),
            'customer': new FormControl(''),
            'showActions': new FormControl('')
        })
    }

    show(process?: ProcessDto) {
        if (process) {
            this.isCreate = false;
            this.processForm.setValue(process);
        } else {
            this.processForm.reset();
        }
        this.modal.show();
    }

    close() {
        this.modal.hide();
    }

    save() {
        if (this.isCreate) {
            this.processForm.value.id = 0;
            this.processService.create(this.processForm.value).subscribe(() => {
                this.notify.success('Saved Successfully', 'Saved', { positionClass: 'toast-top-right' });
                this.processForm.reset();
                this.modalSave.emit(null);
                this.close();
            });
        } else {
            this.processService.update(this.processForm.value).subscribe(() => {
                this.notify.info('Updated Successfully', 'Updated', { positionClass: 'toast-top-right' });
                this.processForm.reset();
                this.modalSave.emit(null);
                this.close();
            });
        }
        this.isCreate = true;
    }

    RowDoubleClickedEvent(row) {
        console.log(row);
    }

    get parentProcessCode() { return this.processForm.get('parentProcessCode') };
    get processCode() { return this.processForm.get('processCode') };
    get processName() { return this.processForm.get('processName') };
}

