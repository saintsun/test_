import { Serializer } from '@shared/json/Serializer';
import { Injectable } from '@angular/core';
import { BaseDto } from '@shared/models/base-dto';
import { BaseSerializer } from '@shared/json/BaseSerializer';

export class UserDto extends BaseDto {
    registerId: string | undefined;
    fullName: string | undefined;
    directorUnit: string | undefined;
    directorUnitCode: string;
    managerUnit: string;
    managerUnitCode: string | undefined;
    chiefUnit: string | undefined;
    positionDescription: string | undefined;
    employeeSubGroup: string;
}

@Injectable()
export class UserSerializer extends BaseSerializer implements Serializer {
    fromJson(json: any): UserDto {
        json = typeof json === 'object' ? json : {};
        const user = new UserDto();

        user.registerId = json['RegisterId'];
        user.fullName = json['FullName'];
        user.directorUnit = json['DirectorUnit'];
        user.directorUnitCode = json['DirectorUnitCode'];
        user.managerUnit = json['ManagerUnit'];
        user.managerUnitCode = json['ManagerUnitCode'];
        user.chiefUnit = json['ChiefUnit'];
        user.positionDescription = json['PositionDescription'];
        user.employeeSubGroup = json['EmployeeSubGroup'];

        return user;
    }

    toJson(resource: UserDto) {
        const data = {};

        data['RegisterId'] = resource.registerId;
        data['FullName'] = resource.fullName;
        data['DirectorUnit'] = resource.directorUnit;
        data['DirectorUnitCode'] = resource.directorUnitCode;
        data['ManagerUnit'] = resource.managerUnit;
        data['ManagerUnitCode'] = resource.managerUnitCode;
        data['ChiefUnit'] = resource.chiefUnit;
        data['PositionDescription'] = resource.positionDescription;
        data['EmployeeSubGroup'] = resource.employeeSubGroup;

        return data;
    }
}
