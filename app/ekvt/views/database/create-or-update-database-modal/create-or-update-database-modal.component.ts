import { AppComponentBase } from '@shared/app-component-base';
import { SafetyCultureDto } from '@app/ekvt/models/dto-models/safety-culture-dto';
import { OnInit, EventEmitter, ViewChild, Output, Injector, Component } from '@angular/core';
import { BsModalRef, ModalDirective, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '@app/ekvt/services/trax/user.service';
import { UserDto } from '@app/ekvt/models/utils/user-dto';
import { SearchComponentModel } from '@app/ekvt/models/utils/search-component-model';
import { DateService } from '@app/services/date/date.service';
import { SafetyCultureProxyService } from '@app/ekvt/services/safety-culture-proxy.service';
import { SearchModelDto } from '@shared/models/search-model-dto';
import { FileUploadDto } from '@app/ekvt/models/dto-models/file-upload-dto';
import { SafetyCultureAttachmentDto } from '@app/ekvt/models/dto-models/safety-culture-attachment-dto';

@Component({
  selector: 'app-create-or-update-database-modal',
  templateUrl: './create-or-update-database-modal.component.html'
})
export class CreateOrUpdateDatabaseModalComponent extends AppComponentBase implements OnInit {

  modalRef: BsModalRef;
  databaseForm: FormGroup;
  safetyCulture = new SafetyCultureDto;
  isCreate = true;
  registerIds: SearchComponentModel[] = [];
  locationTypes: SearchComponentModel[] = [];
  domesticTypes: SearchComponentModel[] = [];
  dateTimeFormat: string;
  dateFormat: string;
  userList: UserDto[] = [];
  selectedFiles: FileUploadDto[] = [];
  removableFiles: SafetyCultureAttachmentDto[] = [];
  tempRemoveFiles: number[] = [];


  @ViewChild('databaseModal') modal: ModalDirective;
  @ViewChild('fileInput') fileInput;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private modalService: BsModalService,
    private safetyCultureService: SafetyCultureProxyService,
    private userService: UserService,
    private dateService: DateService) {
    super(injector);
  }

  // TODO: VALIDATION EKLENECEK
  ngOnInit(): void {
    this.dateTimeFormat = this.dateService.getDateTimeFormat();
    this.dateFormat = this.dateService.getDateFormat();

    this.databaseForm = new FormGroup({
      'id': new FormControl(''),
      'registryId': new FormControl(this.safetyCulture.registryId, [
        Validators.required
      ]),
      'location': new FormControl(this.safetyCulture.location, [
        Validators.required
      ]),
      'incidentDate': new FormControl(this.safetyCulture.incidentDate, [
        Validators.required
      ]),
      'incident': new FormControl(this.safetyCulture.incident, [
        Validators.required
      ]),
      'result': new FormControl(this.safetyCulture.result, [
        Validators.required
      ]),
      'action': new FormControl(this.safetyCulture.action, [
        Validators.required
      ]),
      'domestic': new FormControl(this.safetyCulture.domestic, [
        Validators.required
      ]),
      'files': new FormControl(''),
      'fullName': new FormControl(''),
      'directorUnit': new FormControl(''),
      'managerUnitCode': new FormControl(''),
      'managerUnit': new FormControl(''),
      'chiefUnit': new FormControl(''),
      'positionDescription': new FormControl(''),
      'revisedNo': new FormControl(''),
      'attachments': new FormControl(''),
      'showActions': new FormControl(''),
      'removeFiles': new FormControl('')
    });
  }

  private setDomesticTypes() {
    const domesticType = new SearchComponentModel();
    domesticType.label = 'Yurt İçi';
    domesticType.value = '1';
    const abroadType = new SearchComponentModel();
    abroadType.label = 'Yurt Dışı';
    abroadType.value = '2';

    this.domesticTypes.push(domesticType);
    this.domesticTypes.push(abroadType);
  }

  private setLocationTypes() {
    const saw = new SearchComponentModel();
    saw.label = 'SAW';
    saw.value = 'SAW';
    const ist = new SearchComponentModel();
    ist.label = 'IST';
    ist.value = 'IST';

    this.locationTypes.push(saw);
    this.locationTypes.push(ist);
  }


  searchChanged($event) {
    if ($event && $event.length > 4) {
      const searchModels = [];
      const searchModel: SearchModelDto = new SearchModelDto();

      searchModel.value = $event;
      searchModel.operator = 'contains';
      searchModel.fieldName = 'RegisterId';
      searchModel.caseSensitive = false;
      searchModels.push(searchModel);

      this.userService.getUsersWithPost(searchModels).subscribe(data => {
        if (typeof data.result !== 'undefined' && data.result !== null) {
          this.userList = data.result;
          this.registerIds = this.userList.map(function (user) {
            const selectedRegisterId = new SearchComponentModel();
            selectedRegisterId.value = user.registerId;
            selectedRegisterId.label = user.registerId;

            return selectedRegisterId;
          });
        }
      });
    }
  }

  getUserByRegisterId($event) {
    const registerId = this.registryId.value;

    if (registerId && registerId.value) {
      const data = this.userList.filter(x => x.registerId === registerId.value);

      if (typeof data !== 'undefined' && data !== null && data.length > 0) {
        const user: UserDto = data[0];

        this.registryId.setValue(user.registerId);
        this.fullName.setValue(user.fullName);
        this.directorUnit.setValue(user.directorUnit);
        this.managerUnitCode.setValue(user.managerUnitCode);
        this.chiefUnit.setValue(user.chiefUnit);
        this.positionDescription.setValue(user.positionDescription);
      }
    }
  }

  show(safetyCulture?: SafetyCultureDto) {
    this.locationTypes = [];
    this.domesticTypes = [];
    this.registerIds = [];
    this.selectedFiles = [];
    this.removableFiles = [];
    this.tempRemoveFiles = [];
    (<HTMLInputElement>document.getElementById('files')).value = '';

    this.setLocationTypes();
    this.setDomesticTypes();

    if (safetyCulture) {
      this.isCreate = false;

      const selectedRegisterId = new SearchComponentModel();
      selectedRegisterId.value = safetyCulture.registryId;
      selectedRegisterId.label = safetyCulture.registryId;

      this.registerIds.push(selectedRegisterId);
      this.databaseForm.setValue(safetyCulture);
      this.registryId.setValue(this.registerIds[0]);
      this.removableFiles = safetyCulture.attachments;

      this.domestic.setValue(this.domesticTypes.filter(data => data.value === safetyCulture.domestic.value)[0]);
      this.location.setValue(this.locationTypes.filter(data => data.value === safetyCulture.location.value)[0]);
    } else {
      this.databaseForm.reset();
    }

    this.modal.show();
  }

  close() {
    this.isCreate = true;
    this.modal.hide();
  }

  addFile(): void {
    const nativeElement = this.fileInput.nativeElement;
    if (nativeElement.files && nativeElement.files.length > 0) {
      for (let i = 0; i < nativeElement.files.length; i++) {
        const selectedFile: FileUploadDto = new FileUploadDto();
        const file: File = nativeElement.files[i];
        const myReader: FileReader = new FileReader();

        myReader.onloadend = (e) => {
          let strBase64 = myReader.result + '';
          strBase64 = strBase64.substr(strBase64.indexOf(',') + 1);

          selectedFile.fileName = file.name;
          selectedFile.fileBase = strBase64;

          this.selectedFiles.push(selectedFile);
        }

        myReader.readAsDataURL(file);
      }
    }
  }

  save() {
    const totalFileCount = (<HTMLInputElement>document.getElementById('files')).files.length;

    const fileStatus = this.openConfirmModal(totalFileCount);

    if (fileStatus) {
      if (this.isCreate) {
        this.databaseForm.value.id = 0;
        this.files.setValue(this.selectedFiles);

        this.safetyCultureService.createWithRegisterId(this.databaseForm.value).subscribe(() => {
          this.notify.success('Saved Successfully', 'Saved', { positionClass: 'toast-top-right' });
          this.databaseForm.reset();
          this.modalSave.emit(null);
          this.close();
        });
      } else {
        this.files.setValue(this.selectedFiles);

        this.safetyCultureService.updateWithRegisterId(this.databaseForm.value).subscribe(() => {
          this.notify.info('Updated Successfully', 'Updated', { positionClass: 'toast-top-right' });
          this.databaseForm.reset();
          this.modalSave.emit(null);
          this.close();
        });
      }
      this.isCreate = true;
    }
  }

  openConfirmModal(totalFileCount: number) {
    if (totalFileCount === 0) {
      if (this.isCreate) {
        alert('Doküman Eklemeden Kayıt İşlemi Gerçekleştirilememektedir.');

        return false;
      } else {
        const attachments = this.attachments.value;
        const removeFilesIds: number[] = this.removeFiles.value;
        const removeFiles = attachments.filter(data => removeFilesIds.find(rId => rId === data.id));

        if (removeFiles.length === attachments.length) {
          alert('Doküman Eklemeden Güncelleme İşlemi Gerçekleştirilememektedir.');

          return false;
        }
      }
    }

    return true;
  }

  setFiles(nativeFileInput: any): FileList {
    return nativeFileInput.files;
  }

  addDeleteList(fileId, fileName) {
    if (confirm(fileName + ' isimli dosya silinecek dosyalar listesine kaydedilecektir. Onaylıyor musunuz?')) {
      // const element = event.target.parentNode.parentNode.parentNode.parentNode;

      // element.parentNode.removeChild(element);
      this.removableFiles = this.removableFiles.filter(data => data.id !== fileId);
      this.tempRemoveFiles.push(fileId);

      this.removeFiles.setValue(this.tempRemoveFiles);
    }
  }

  RowDoubleClickedEvent(row) {
    console.log(row);
  }

  get registryId() { return this.databaseForm.get('registryId') };
  get revisedNo() { return this.databaseForm.get('revisedNo') };
  get fullName() { return this.databaseForm.get('fullName') };
  get directorUnit() { return this.databaseForm.get('directorUnit') };
  get managerUnitCode() { return this.databaseForm.get('managerUnitCode') };
  get chiefUnit() { return this.databaseForm.get('chiefUnit') };
  get positionDescription() { return this.databaseForm.get('positionDescription') };
  get location() { return this.databaseForm.get('location') };
  get incidentDate() { return this.databaseForm.get('incidentDate') };
  get incident() { return this.databaseForm.get('incident') };
  get result() { return this.databaseForm.get('result') };
  get action() { return this.databaseForm.get('action') };
  get domestic() { return this.databaseForm.get('domestic') };
  get attachments() { return this.databaseForm.get('attachments') };
  get files() { return this.databaseForm.get('files') };
  get removeFiles() { return this.databaseForm.get('removeFiles') };
}
