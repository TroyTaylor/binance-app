import angular from 'angular';
const binance = require('node-binance-api');
binance.options({
    'APIKEY': 'vvn2poZ3fa1tZ3nrZJvwfxXHcryW4P6hIckUj4b7jgHbK30RsbpRazcW9hMJIRxl',
    'APISECRET': 'nkVCBRUlrbS2KhHiCs2j5OYekRYrCwOBVphrozQ7Nid63NWrNM0UOqnHNTjTfSXC'
});

import '../style/app.css';

let app = () => {
    return {
        template: require('./app.html'),
        controller: 'AppCtrl',
        controllerAs: 'app'
    }
};

class AppCtrl {
    constructor() {
        this.url = 'https://github.com/preboot/angular-webpack';
    }
}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [])
    .directive('app', app)
    .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;