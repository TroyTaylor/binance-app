import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

import {enableProdMode} from '@angular/core';
enableProdMode();

const preBootstrapContainer = document.getElementById('pre-bootstrap-container');
const preBootstrap = document.getElementById('pre-bootstrap');

try {
    platformBrowserDynamic().bootstrapModule(AppModule);
    preBootstrap.className = 'loaded';

    setTimeout(() => {
        preBootstrapContainer.parentNode.removeChild(preBootstrapContainer);
    }, 300); // fade out animation
} catch (error) {
    preBootstrap.className = 'load-failed';

    throw error;
}
