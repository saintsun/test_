import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { IconService } from '@app/services/icon/icon.service';
import { BaseSerializer } from '@shared/json/BaseSerializer';
import { AppConsts } from '@shared/AppConsts';

export class SafetyCultureAttachmentDto extends BaseDto {
    safetyCultureId: number;
    revisedNo: string;
    fileTitle: string;
    fileName: string | undefined;
    createdBy: string;
    createdDate: Date;
    updatedBy: string | undefined;
    updatedDate: Date | undefined;
    isDeleted: boolean;
    deletedBy: string | undefined;
    deletedDate: Date | undefined;
    fileUrl: string | undefined;
    fileExtension: string | undefined;
    fileIcon: string | undefined;
    operationDetail: string;
    isExternal: boolean;
}

@Injectable()
export class SafetyCultureAttachmentSerializer extends BaseSerializer implements Serializer {

    apiBaseUrl = AppConsts.apiBaseUrl;
    constructor(private iconService: IconService) {
        super();
    }

    fromJson(json: any): SafetyCultureAttachmentDto {
        json = typeof json === 'object' ? json : {};
        const safetyCultureAttachment = new SafetyCultureAttachmentDto();
        const splittedFileTitle = json['FileTitle'] !== undefined && json['FileTitle'] !== null ? json['FileTitle'].split('.') : [];

        safetyCultureAttachment.id = json['Id'];
        safetyCultureAttachment.revisedNo = json['RevisedNo'] === undefined ? '0' : json['RevisedNo'];
        safetyCultureAttachment.fileExtension = splittedFileTitle.length > 0 ? splittedFileTitle[splittedFileTitle.length - 1] : '';
        safetyCultureAttachment.fileTitle = json['FileTitle'];
        safetyCultureAttachment.fileName = json['FileName'];
        safetyCultureAttachment.createdBy = json['CreatedBy'];
        safetyCultureAttachment.createdDate = json['CanagerUnit'];
        safetyCultureAttachment.operationDetail = json['OperationDetail'];
        safetyCultureAttachment.fileIcon = this.iconService.getFileIconByExtension(safetyCultureAttachment.fileExtension);
        safetyCultureAttachment.isExternal = json['IsExternal'];

        let fileUrl = this.apiBaseUrl + '/ekvt/Download/' + safetyCultureAttachment.id;

        if (safetyCultureAttachment.isExternal) {
            const isUrl = validURL(safetyCultureAttachment.fileName);
            if (isUrl) {
                fileUrl = safetyCultureAttachment.fileName;
            } else {
                let tempFileUrl = safetyCultureAttachment.fileName.startsWith('\\') ?
                    safetyCultureAttachment.fileName.slice(1) : safetyCultureAttachment.fileName;
                tempFileUrl = tempFileUrl.replace(/\\/gi, '/');

                fileUrl = tempFileUrl.startsWith('file:') || tempFileUrl.startsWith('File:') ? tempFileUrl : 'file:///' + tempFileUrl;
            }
        }

        safetyCultureAttachment.fileUrl = fileUrl;

        return safetyCultureAttachment;
    }

    toJson(resource: SafetyCultureAttachmentDto) {
        const data = {};

        data['Id'] = resource.id;
        data['RevisedNo'] = resource.revisedNo;
        data['FileTitle'] = resource.fileTitle;
        data['FileName'] = resource.fileName;

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
