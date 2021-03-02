import {CoreModule, HOOK_COMPONENTS} from "@c8y/ngx-components";
import {WidgetConfigEventsList} from "./events-list-widget-config.component";
import {WidgetEventsList} from "./events-list-widget.component";
import {NgModule} from "@angular/core";

// This will import css from the styles folder (Note: will be applied globally, not scoped to the module/components)
import '~styles/index.css';

// You can also import css from a module
// import 'some-module/styles.css'

@NgModule({
    imports: [
        CoreModule
    ],
    declarations: [WidgetEventsList, WidgetConfigEventsList],
    entryComponents: [WidgetEventsList, WidgetConfigEventsList],
    providers: [
        // Connect the widget to Cumulocity via the HOOK_COMPONENT injection token
        {
            provide: HOOK_COMPONENTS,
            multi: true,
            useValue: {
                id: 'acme.test.widget',
                label: 'Test widget',
                description: 'Displays some mirrored text',
                component: WidgetEventsList,
                configComponent: WidgetConfigEventsList,
                previewImage: require("~styles/previewImage.png"),
                // data: {
                //     settings: {
                //         noDeviceTarget: true
                //     }
                // }
            }
        }
    ],
})
export class EventsListWidgetModule {}
