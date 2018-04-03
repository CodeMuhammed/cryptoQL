import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Mat_LOADERS } from "./mat-loaders";

import {
    NavbarComponent,
    SubmenuComponent,
    ToolbarComponent,
    ThumbnailComponent
} from './components';

@NgModule({
    declarations: [
        NavbarComponent,
        SubmenuComponent,
        ToolbarComponent,
        ThumbnailComponent
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule,
        Mat_LOADERS.IMPORTS,
        NavbarComponent,
        SubmenuComponent,
        ToolbarComponent,
        ThumbnailComponent
    ],
    imports: [
        Mat_LOADERS.IMPORTS,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule
    ],
    providers: [],
    entryComponents: []
})
export class SharedModule { }
