import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import {
    CoinListComponent,
} from './components';

import { CoinListRoutes } from './coinlist.routing';


@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(CoinListRoutes),
    ],
    declarations: [
        CoinListComponent

    ], exports: [
        CoinListComponent
    ],
    providers: []
})

export class CoinListModule { }
