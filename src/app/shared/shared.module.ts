import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Mat_LOADERS } from "./mat-loaders";

@NgModule({
    declarations: [],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule,
        Mat_LOADERS.IMPORTS
    ],
    imports: [
        Mat_LOADERS.IMPORTS,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule
    ],
    providers: [],
    entryComponents: [ ]
})
export class SharedModule { }
