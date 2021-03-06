import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import {
    PortfolioComponent,
    PortfolioStartComponent,
    CoinPageComponent,
    CoinFormComponent,
    AccountsComponent
} from './components';
import { PortfolioRoutes } from './portfolio.routing';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(PortfolioRoutes),
    ],
    declarations: [
        PortfolioComponent,
        PortfolioStartComponent,
        CoinPageComponent,
        CoinFormComponent,
        AccountsComponent
    ], exports: [
        PortfolioComponent,
        PortfolioStartComponent,
        CoinPageComponent,
        CoinFormComponent,
        AccountsComponent
    ],
    providers: []
})

export class PortfolioModule { }
