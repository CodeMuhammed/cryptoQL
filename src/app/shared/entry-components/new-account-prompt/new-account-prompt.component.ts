import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Account } from 'app/shared/models';
import { format } from 'date-fns';

// This is the dialog component for rescheduling dates
@Component({
    selector: 'app-new-account-prompt',
    templateUrl: './new-account-prompt.component.html',
})
export class NewAccountPromptComponent {
    public form: FormGroup;
    public account: Account;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<NewAccountPromptComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit() {
        this.account = this.data.account;
        this.createForm();
        this.setFormValues();
    }

    continue(): void {
        let account: Account = Object.assign({}, this.account, this.form.value);
        this.dialogRef.close(account);
    }

    cancel(): void {
        this.dialogRef.close();
    }

    createForm() {
        this.form = this.fb.group({
            email: ['', Validators.email],
            password: ['', Validators.required],
            ethAddress: ['', Validators.compose([this.ethAddressValidator()])],
            totalCoins: ['', Validators.required],
            claimed: [''],
        });
    }

    setFormValues() {
        this.form.patchValue({
            email: this.account ? this.account.email : '',
            password: this.account ? this.account.password : '',
            ethAddress: this.account ? this.account.ethAddress : '',
            totalCoins: this.account ? this.account.totalCoins : '',
            claimed: this.account ? this.account.claimed : ''
        });
    }

    /**
     * Checks if the given string is an address
     *
     * @method isAddress
     * @param {String} address the given HEX adress
     * @return {Boolean}
    */
    isAddress(address) {
        if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
            // check if it has the basic requirements of an address
            return false;
        } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
            // If it's all small caps or all all caps, return true
            return true;
        }

        return true;
    };

    ethAddressValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const isValid = this.isAddress(control.value);
            return !isValid ? { 'invalidEthAddress': { value: control.value } } : null;
        };
    }
}
