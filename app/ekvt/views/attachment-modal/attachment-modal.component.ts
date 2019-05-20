import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { ModalDirective, BsModalRef } from 'ngx-bootstrap';
import { SafetyCultureAttachmentDto } from '@app/ekvt/models/dto-models/safety-culture-attachment-dto';

@Component({
  selector: 'app-attachment-modal',
  templateUrl: './attachment-modal.component.html'
})
export class AttachmentModalComponent extends AppComponentBase implements OnInit {
  modalRef: BsModalRef;
  attachments: SafetyCultureAttachmentDto[] = []

  @ViewChild('attachModal') modal: ModalDirective;
  @ViewChild('fileInput') fileInput;

  constructor(injector: Injector) {
    super(injector)
  }

  ngOnInit(): void {
  }

  show(data: any) {
    this.attachments = data.attachments;

    this.modal.show();
  }

  close() {
    this.modal.hide();
  }
}
