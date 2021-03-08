import { IManagedObject } from '@c8y/client';

export class Device {
    id : string;
    name : string;
    orderNr: string;
    caseId : string;
    chargeNr : string;
    articleNr: string;

    constructor(managedObject:IManagedObject){
        this.id = managedObject.id;
        this.name = managedObject.name;
        if (managedObject.cmdb_properties){
            this.orderNr = managedObject.cmdb_properties.OrderNr;
            this.caseId = managedObject.cmdb_properties.CaseId;
            this.chargeNr = managedObject.cmdb_properties.ChargeNr;
            this.articleNr = managedObject.cmdb_properties.ArticleNr;
        } else {
            this.orderNr = '';
            this.caseId = '';
            this.chargeNr = '';
            this.articleNr = '';
        }
    }
}