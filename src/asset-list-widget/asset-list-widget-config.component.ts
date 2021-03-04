import { Component, Input } from '@angular/core';

@Component({
    templateUrl: './asset-list-widget-config.component.html'
})
export class WidgetConfigAssetList {
    @Input() config: any = {};
}