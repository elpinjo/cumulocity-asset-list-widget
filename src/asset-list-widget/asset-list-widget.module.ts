import {CoreModule, HOOK_COMPONENTS} from "@c8y/ngx-components";
import {WidgetConfigAssetList} from "./asset-list-widget-config.component";
import {WidgetAssetList} from "./asset-list-widget.component";
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {NgModule} from "@angular/core";

// This will import css from the styles folder (Note: will be applied globally, not scoped to the module/components)
import '~styles/index.css';

// You can also import css from a module
// import 'some-module/styles.css'

@NgModule({
    imports: [
        CoreModule,
        MatInputModule,
        MatTableModule,
        MatSortModule
    ],
    declarations: [WidgetAssetList, WidgetConfigAssetList],
    entryComponents: [WidgetAssetList, WidgetConfigAssetList],
    providers: [
        // Connect the widget to Cumulocity via the HOOK_COMPONENT injection token
        {
            provide: HOOK_COMPONENTS,
            multi: true,
            useValue: {
                id: 'com.softwareag.assetlist.widget',
                label: 'Asset List widget',
                description: 'Shows a searchable list of devices',
                component: WidgetAssetList,
                configComponent: WidgetConfigAssetList,
                previewImage: require("~styles/previewImage.png"),
                data: {
                    settings: {
                        //noDeviceTarget: true
                        groupsSelectable: true
                    }
                }
            }
        }
    ],
})
export class AssetListWidgetModule {}
