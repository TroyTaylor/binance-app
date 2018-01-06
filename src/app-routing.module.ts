import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TradePageComponent } from './components/trade-page/trade-page.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/trade',
        pathMatch: 'full',
    }, {
        path: 'trade',
        component: TradePageComponent,
    }, /*{
        path: '**',
        redirectTo: '/error',
        pathMatch: 'full',
    },*/
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
})
export class AppRoutingModule {}
