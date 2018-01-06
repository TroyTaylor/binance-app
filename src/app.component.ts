import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
    selector: 'my-app',
    template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
    constructor(
        
    ) {
    }

    ngOnInit() {
        
    }
}
