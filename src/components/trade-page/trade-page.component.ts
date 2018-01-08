import { Component } from '@angular/core';
import { ChartModule } from 'angular2-highcharts';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'trade-page',
    //template: `<trade></trade>`,
    template: require('./trade.component.html'),
})

export class TradePageComponent  {
    binance = require('node-binance-api');
    moment = require('moment');

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

    candlestickTime = '1m';
    currentCandlesticks: any[];
    chartOptions = {
        title: { text: 'CandleSticks' },
        rangeSelector: {
            selected: 1
        },
        series: [{
            type: 'candlestick',
            name: 'CandleSticks',
            data: {},
            dataGrouping: {
                units: [
                    [
                        'week', // unit name
                        [1] // allowed multiples
                    ], [
                        'month',
                        [1, 2, 3, 4, 6]
                    ]
                ]
            },
            tooltip: {
                valueDecimals: 2
            }
        }]
    }

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

    setCandleRange(value: string): void {
        this.candlestickTime = value;
        this.currentCandlesticks = [];
        this.getCandlesticks(this);
    }

    getCandlesticks(that: any): void {
        this.binance.candlesticks(this.ticketChoice, this.candlestickTime, function(ticks: any, symbol: any) {
            let chartData = new Array();
            //time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored
            that.currentCandlesticks = ticks.slice(Math.max(ticks.length - 10, 1));
            for (let i of that.currentCandlesticks) {
                const nextData = i.slice(0, 5);
                //console.log(nextData);
                chartData.push(nextData);
                const time = new Date(i[0]);
                i.time = that.moment(time).format('YYYY-MM-DD h:mm a');
            }
            that.chartOptions.series.data = chartData;
        });
    }

    chooseDepth(value: string): void {
        const that = this;
        this.ticketChoice = value;
        this.depthAsks = {};
        this.depthAsksKeys = [];
        this.depthBids = {};
        this.depthBidsKeys = [];
        this.currentCandlesticks = [];
        this.getCandlesticks(this);
    }

    getDepth(that: any): void {
        if (that.ticketChoice !== '') {
            this.binance.depth(that.ticketChoice, function(depth: any, symbol: any) {
                that.depthAsks = depth.asks;
                that.depthAsksKeys = Object.keys(that.depthAsks);
                that.depthBids = depth.bids;
                that.depthBidsKeys = Object.keys(that.depthBids);
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
