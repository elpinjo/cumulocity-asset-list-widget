import { Component, Input } from '@angular/core';

@Component({
    templateUrl: './events-list-widget.component.html',
    styles: [ `.text { transform: scaleX(-1); font-size: 3em ;}` ]
})
export class WidgetEventsList {
    @Input() config;
}
