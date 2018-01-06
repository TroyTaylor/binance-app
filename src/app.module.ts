import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

//import './rxjs-extensions';

import { AppComponent } from './app.component';

import { APP_CONFIG, TagVal_AppConfig } from './app.config';

import { AppRoutingModule } from './app-routing.module';
import { TradePageComponent } from './components/trade-page/trade-page.component';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
        JsonpModule,
    ],
    declarations: [
        AppComponent,
        //RulesComponent,

        TradePageComponent,
    ],
    providers: [
        { provide: APP_CONFIG, useValue: TagVal_AppConfig },
        //{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    ],
    bootstrap:    [ AppComponent ],
})
export class AppModule { }
