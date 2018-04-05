import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import {
    PortfolioComponent,
} from './components';

import { PortfolioRoutes } from './portfolio.routing';


@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(PortfolioRoutes),
    ],
    declarations: [
        PortfolioComponent

    ], exports: [
        PortfolioComponent
    ],
    providers: []
})

export class PortfolioModule { }
