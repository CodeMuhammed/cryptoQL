import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material";

@Injectable()
export class PromptsService {
    private loading = false;
    public activeMediaQuery: string = '';

    constructor(
        private snackBar: MatSnackBar,
    ) { }

    showToast(message: string, actionText?: string, actionCallbak?: any) {
        let snackbarRef = this.snackBar.open(message, actionText, {
            duration: 4000
        });

        if(actionCallbak) {
            snackbarRef.onAction().subscribe(() => {
                actionCallbak();
            });
        }
    }

}
