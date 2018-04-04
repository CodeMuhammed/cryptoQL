import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import {
    LoginComponent,
} from './components';

import { LoginRoutes } from './auth.routing';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(LoginRoutes),
    ],
    declarations: [
        LoginComponent
    ], exports: [
        LoginComponent
    ],
    providers: []
})

export class AuthModule { }
