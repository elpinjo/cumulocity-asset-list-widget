import { Component, Input, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { RouteConfigLoadEnd } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { InventoryService } from '@c8y/client';
import { PROPERTIES } from './properties';
import { Device } from '../device';

@Component({
    templateUrl: './asset-list-widget.component.html',
    styles: [ `.text { transform: scaleX(-1); font-size: 3em ;}` ]
})
export class WidgetAssetList implements AfterViewInit, OnInit {
    @ViewChild(MatSort, { static: false }) set sort(s: MatSort) {
        this.dataSource.sort = s;
    }

    constructor (
        public inventory: InventoryService
    ) {}

    devices: Device[];
    dataSource: MatTableDataSource<Device>;

    inventoryFilter: object = {
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
        this.inventory.list(this.inventoryFilter).then(data => {
            // console.log("retrieved config: ", JSON.stringify(this.config));
            // console.log("inventory results: ", JSON.stringify(data.data));

            this.devices = data.data.map(managedObject => new Device(managedObject));
            console.log("devices: ", JSON.stringify(this.devices));
            this.dataSource = new MatTableDataSource(this.devices);
        });
    }

    sortData(sort: MatSort) {
        this.sort = sort;
    }
    
    ngOnInit() {
        this.fetchAssets();
        this.dataSource.sort = this.sort;
    }

    ngAfterViewInit() {
        console.log("active sort:" , JSON.stringify(this.sort));
        this.dataSource.sort = this.sort;
    }
}
