import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { RouteConfigLoadEnd } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { InventoryService, IManagedObject } from '@c8y/client';
import { PROPERTIES } from './properties';

@Component({
    templateUrl: './asset-list-widget.component.html',
    styles: [ `.text { transform: scaleX(-1); font-size: 3em ;}` ]
})
export class WidgetAssetList {
    @Input() config;
    @ViewChild(MatSort, {static: false}) sort: MatSort;

    constructor (
        public inventory: InventoryService
    ) {}

    devices: IManagedObject[];
    dataSource: MatTableDataSource<IManagedObject>;
    //dataSource = new MatTableDataSource(ELEMENT_DATA);
    properties:{};


    filter: object = {
        fragmentType: 'c8y_IsDevice',
        withTotalPages: true,
        pageSize: 100,
    };

    displayedColumns: string[] = ['id', 'name', 'orderNr', 'caseId', 'chargeNr', 'articleNr'];


    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    
    async fetchAssets() {
        this.inventory.list(this.filter).then(data => {
            console.log("retrieved config: ", JSON.stringify(this.config));
            //console.log("inventory results: ", JSON.stringify(data.data));

            this.devices = data.data;
            this.dataSource = new MatTableDataSource(this.devices);
        });
    }

    ngOnInit() {
        this.fetchAssets();
        this.properties = PROPERTIES;
    }

    ngAfterViewInit() {
       this.dataSource.sort = this.sort;
    }
}
