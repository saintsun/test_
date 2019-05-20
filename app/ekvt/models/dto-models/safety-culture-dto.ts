import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { SafetyCultureAttachmentDto } from './safety-culture-attachment-dto';
import { IconService } from '@app/services/icon/icon.service';
import { BaseSerializer } from '@shared/json/BaseSerializer';
import { FileUploadDto } from './file-upload-dto';
import { AppConsts } from '@shared/AppConsts';

export class SafetyCultureDto extends BaseDto {
    revisedNo: number | undefined;
    registryId: any | undefined;
    fullName: string | undefined;
    directorUnitCode: string | undefined;
    directorUnit: string | undefined;
    managerUnitCode: string | undefined;
    managerUnit: string | undefined;
    chiefUnitCode: string | undefined;
    chiefUnit: string | undefined;
    positionDescription: string | undefined;
    location: any | undefined;
    incidentDate: Date | undefined;
    createdBy: string | undefined;
    updatedBy: string | undefined;
    updatedDate: Date | undefined;
    rowHash: string | undefined;
    incident: string | undefined;
    result: string | undefined;
    action: string | undefined;
    domestic: any | undefined;
    attachments: SafetyCultureAttachmentDto[] = [];
    files: FileUploadDto[] = [];
    removeFiles: number[] = [];
}

@Injectable()
export class SafetyCultureSerializer extends BaseSerializer implements Serializer {
    apiBaseUrl = AppConsts.apiBaseUrl;

    constructor(private iconService: IconService) {
        super();
    }

    fromJson(json: any): SafetyCultureDto {
        json = typeof json === 'object' ? json : {};
        const safetyCulture = new SafetyCultureDto();

        safetyCulture.id = json['Id'];
        safetyCulture.revisedNo = json['RevisedNo'] === undefined ? '0' : json['RevisedNo'];
        safetyCulture.registryId = json['RegistryId'];
        safetyCulture.fullName = json['FullName'];
        safetyCulture.directorUnit = json['DirectorUnit'];
        safetyCulture.managerUnit = json['ManagerUnit'];
        safetyCulture.managerUnitCode = json['ManagerUnit'];
        safetyCulture.chiefUnit = json['ChiefUnit'];
        safetyCulture.positionDescription = json['PositionDescription'];
        safetyCulture.incidentDate = new Date(json['IncidentDate']);
        safetyCulture.incident = json['Incident'];
        safetyCulture.result = json['Result'];
        safetyCulture.action = json['Action'];
        safetyCulture.attachments = json['Attachments'] === undefined ? [] : this.attachmentsFromJson(json['Attachments']);
        safetyCulture.files = [];
        safetyCulture.location = {
            value: json['Location'] + '',
            label: json['Location'] + ''
        }
        safetyCulture.domestic = {
            value: json['Domestic'] + '',
            label: json['Domestic'] === '1' ? 'Yurt İçi' : 'Yurt Dışı'
        }

        return safetyCulture;
    }

    attachmentsFromJson(jsonArray: any[]): SafetyCultureAttachmentDto[] {
        const attachments: SafetyCultureAttachmentDto[] = [];
        jsonArray.forEach(file => {

            file = typeof file === 'object' ? file : {};
            const attachment = new SafetyCultureAttachmentDto();
            const splittedFileTitle = file['FileTitle'] !== undefined && file['FileTitle'] !== null ? file['FileTitle'].split('.') : [];

            attachment.id = file['Id'];
            attachment.revisedNo = file['RevisedNo'] === undefined ? '0' : file['RevisedNo'];
            attachment.fileExtension = splittedFileTitle.length > 0 ? splittedFileTitle[splittedFileTitle.length - 1] : '';
            attachment.fileTitle = file['FileTitle'];
            attachment.fileName = file['FileName'];
            attachment.createdBy = file['CreatedBy'];
            attachment.createdDate = file['CanagerUnit'];
            attachment.fileIcon = this.iconService.getFileIconByExtension(attachment.fileExtension);
            attachment.isExternal = file['IsExternal'];

            let fileUrl = this.apiBaseUrl + '/ekvt/Download/' + attachment.id;

            if (attachment.isExternal) {
                const isUrl = validURL(attachment.fileName);
                if (isUrl) {
                    fileUrl = attachment.fileName;
                } else {
                    let tempFileUrl = attachment.fileName.startsWith('\\') ? attachment.fileName.slice(1) : attachment.fileName;
                    tempFileUrl = tempFileUrl.replace(/\\/gi, '/');

                    fileUrl = tempFileUrl.startsWith('file:') || tempFileUrl.startsWith('File:') ? tempFileUrl : 'file:///' + tempFileUrl;
                }
            }

            attachment.fileUrl = fileUrl;

            attachments.push(attachment);
        });

        return attachments;
    }

    toFilesJson(jsonArray: FileUploadDto[]): any[] {
        const datas = [];

        jsonArray.forEach(file => {
            const data = {};

            data['FileBase'] = file.fileBase;
            data['FileName'] = file.fileName;

            datas.push(data);
        });

        return datas;
    }


    toJson(resource: SafetyCultureDto) {
        const data = {};

        data['Id'] = (resource.id !== undefined || resource.id === null) ? '0' : resource.id;
        data['RevisedNo'] = (resource.revisedNo !== undefined || resource.revisedNo === null) ? '0' : resource.revisedNo;
        data['RegistryId'] = (typeof resource.registryId === 'string') ? resource.registryId : resource.registryId.value;
        data['Location'] = resource.location.value;
        data['IncidentDate'] = resource.incidentDate;
        data['Incident'] = resource.incident;
        data['Result'] = resource.result;
        data['Action'] = resource.action;
        data['Domestic'] = resource.domestic.value;
        data['Files'] = this.toFilesJson(resource.files);

        if (resource.id !== undefined && resource.id !== null) {
            data['RemoveFiles'] = (resource.removeFiles === undefined || resource.removeFiles === null) ? [] : resource.removeFiles;
        }

        return data;
    }
}

function validURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

    return !!pattern.test(str);
}
