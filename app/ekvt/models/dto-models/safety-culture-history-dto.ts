import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { IconService } from '@app/services/icon/icon.service';
import { SafetyCultureAttachmentDto } from './safety-culture-attachment-dto';
import { BaseSerializer } from '@shared/json/BaseSerializer';
import { AppConsts } from '@shared/AppConsts';

export class SafetyCultureHistoryDto extends BaseDto {
    historyId: number;
    registryId: string | undefined;
    fullName: string | undefined;
    directorUnitCode: string | undefined;
    managerUnitCode: string | undefined;
    chiefUnitCode: string | undefined;
    positionDescription: string | undefined;
    location: string | undefined;
    incidentDate: Date | undefined;
    incident: string | undefined;
    result: string | undefined;
    action: string | undefined;
    domestic: string | undefined;
    attachments: SafetyCultureAttachmentDto[] = [];
}

@Injectable()
export class SafetyCultureHistorySerializer extends BaseSerializer implements Serializer {
    apiBaseUrl = AppConsts.apiBaseUrl;

    constructor(private iconService: IconService) {
        super();
    }

    fromJson(json: any): SafetyCultureHistoryDto {
        json = typeof json === 'object' ? json : {};
        const safetyCultureHistory = new SafetyCultureHistoryDto();

        safetyCultureHistory.id = json['SafetyCultureId'];
        safetyCultureHistory.historyId = json['Id'];
        safetyCultureHistory.registryId = json['AuthorizedPersonnelId'];
        safetyCultureHistory.fullName = json['FullName'];
        safetyCultureHistory.directorUnitCode = json['DirectorUnit'];
        safetyCultureHistory.managerUnitCode = json['ManagerUnit'];
        safetyCultureHistory.chiefUnitCode = json['ChiefUnit'];
        safetyCultureHistory.positionDescription = json['PositionDescription'];
        safetyCultureHistory.location = json['Location'];
        safetyCultureHistory.incidentDate = new Date(json['IncidentDate']);
        safetyCultureHistory.incident = json['Incident'];
        safetyCultureHistory.result = json['Result'];
        safetyCultureHistory.action = json['Action'];
        safetyCultureHistory.domestic = json['Domestic'] === '1' ? 'Yurt İçi' : 'Yurt Dışı';
        safetyCultureHistory.attachments = json['Attachments'] === undefined ? [] : this.attachmentsFromJson(json['Attachments']);

        return safetyCultureHistory;
    }

    attachmentsFromJson(jsonArray: any[]): SafetyCultureAttachmentDto[] {
        const attachments: SafetyCultureAttachmentDto[] = [];
        jsonArray.forEach(file => {
            file = typeof file === 'object' ? file : {};
            const attachment = new SafetyCultureAttachmentDto();
            const splittedFileTitle = file['FileTitle'] !== undefined && file['FileTitle'] !== null ? file['FileTitle'].split('.') : [];

            attachment.id = file['SafetyCultureAtachmentId'];
            attachment.revisedNo = file['RevisedNo'] === undefined ? '0' : file['RevisedNo'];
            attachment.fileExtension = splittedFileTitle.length > 0 ? splittedFileTitle[splittedFileTitle.length - 1] : '';
            attachment.fileTitle = file['FileTitle'];
            attachment.fileName = file['FileName'];
            attachment.createdBy = file['CreatedBy'];
            attachment.createdDate = file['CanagerUnit'];
            attachment.operationDetail = file['OperationDetail'];
            attachment.fileIcon = this.iconService.getFileIconByExtension(attachment.fileExtension);
            attachment.isExternal = file['IsExternal'];

            let fileUrl = this.apiBaseUrl + '/ekvt/Download/' + attachment.id;

            // if (attachment.isExternal) {
            //     const isUrl = validURL(attachment.fileName);
            //     if (isUrl) {
            //         fileUrl = attachment.fileName;
            //     } else {
            //         let tempFileUrl = attachment.fileName.startsWith('\\') ? attachment.fileName.slice(1) : attachment.fileName;
            //         tempFileUrl = tempFileUrl.replace(/\\/gi, '/');

            //         fileUrl = tempFileUrl.startsWith('file:') || tempFileUrl.startsWith('File:') ? tempFileUrl : 'file:///' + tempFileUrl;
            //     }
            // }

            attachment.fileUrl = fileUrl;

            attachments.push(attachment);
        });

        return attachments;
    }

    toJson(resource: SafetyCultureHistoryDto) {
        const data = {};

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
