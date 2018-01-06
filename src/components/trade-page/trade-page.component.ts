import { Component } from '@angular/core';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'trade-page',
    //template: `<trade></trade>`,
    template: require('./trade.component.html'),
})

export class TradePageComponent  {
    binance = require('node-binance-api');

    prices = {};
    priceKeys: string[];
    filteredPriceKeys: string[];
    priceFilter = 'BTC';
    priceRegEx = new RegExp('BTC$');

    bookTickers = {};
    bookTickerKeys: string[];
	
    ticketChoice = '';

    depthAsks = {};
    depthAsksKeys: string[];

    depthBids = {};
    depthBidsKeys: string[];

    constructor(
        //private _api: APIService,
    ) {

    }

    filterPrices(value: string): void {
        this.priceFilter = value;
        this.priceRegEx = new RegExp(this.priceFilter + '$');
        this.filteredPriceKeys = this.priceKeys.filter(key => key.match(this.priceRegEx));
    }

    getPrices(that: any): void {
        this.binance.prices(function(ticker: any[]) {
            that.prices = ticker;
            that.priceKeys = Object.keys(that.prices);
            that.filteredPriceKeys = Object.keys(that.prices).filter(key => key.match(that.priceRegEx));
        });
    }

    getBookTickers(that: any): void {
        this.binance.bookTickers(function(ticker: any[]) {
            that.bookTickers = ticker;
            that.bookTickerKeys = Object.keys(that.bookTickers);
        });
    }

    chooseDepth(value: string): void {
        this.ticketChoice = value;
        this.depthAsks = {};
        this.depthAsksKeys = [];
        this.depthBids = {};
        this.depthBidsKeys = [];
    }

    getDepth(that: any): void {
        if (that.ticketChoice !== '') {
            this.binance.depth(that.ticketChoice, function(depth: any, symbol: any) {
                that.depthAsks = depth.asks;
                that.depthAsksKeys = Object.keys(that.depthAsks);
                that.depthBids = depth.bids;
                that.depthBidsKeys = Object.keys(that.depthBids);
                //console.log(that.depthBids);
            });
        }
    }

    ngOnInit() {
        const that = this;
        let timer = Observable.timer(1000, 1000);
        this.binance.options = {
            'APIKEY': 'vvn2poZ3fa1tZ3nrZJvwfxXHcryW4P6hIckUj4b7jgHbK30RsbpRazcW9hMJIRxl',
            'APISECRET': 'nkVCBRUlrbS2KhHiCs2j5OYekRYrCwOBVphrozQ7Nid63NWrNM0UOqnHNTjTfSXC'
        };
        timer.subscribe((response) => {
            this.getPrices(this);
            this.getBookTickers(this);
            this.getDepth(this);
        });
    }
}
