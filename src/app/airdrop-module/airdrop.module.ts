import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import {
    AirdropComponent,
} from './components';

import { AirdropRoutes } from './airdrop.routing';


@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(AirdropRoutes),
    ],
    declarations: [
        AirdropComponent

    ], exports: [
        AirdropComponent
    ],
    providers: []
})

export class AirdropModule { }
