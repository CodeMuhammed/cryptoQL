import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Mat_LOADERS } from "./mat-loaders";
import { ClipboardModule } from 'ngx-clipboard';

import {
    NavbarComponent,
    SubmenuComponent,
    ToolbarComponent,
    ThumbnailComponent,
    DataTableComponent
} from './components';

import { NewAccountPromptComponent } from './entry-components';

@NgModule({
    declarations: [
        NavbarComponent,
        SubmenuComponent,
        ToolbarComponent,
        ThumbnailComponent,
        DataTableComponent,
        NewAccountPromptComponent
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
        ThumbnailComponent,
        DataTableComponent,
        NewAccountPromptComponent,
        FormsModule,
        ReactiveFormsModule,
        ClipboardModule
    ],
    imports: [
        Mat_LOADERS.IMPORTS,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule,
        ClipboardModule
    ],
    providers: [],
    entryComponents: [
        NewAccountPromptComponent
    ]
})
export class SharedModule { }
