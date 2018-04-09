import { Component, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

/**
 * @title Table with filtering
 */
@Component({
    selector: 'data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.css']
})
export class DataTableComponent {
    @Input()
    public tableFor: string;

    @Input()
    public height: string;

    @Input()
    public actionButtonLabel: string;

    @Input()
    public data: any[];

    @Input()
    public displayProperties: string[];

    @Input()
    public allowSelection: boolean[];

    @Output()
    public onSubmit: EventEmitter<any> = new EventEmitter();

    @Output()
    public onSelectRow: EventEmitter<any> = new EventEmitter();

    public selection = new SelectionModel<any>(true, []);
    public matTableDataSource = new MatTableDataSource<any>();

    @ViewChild('filter') filter: ElementRef;

    public label: any = {};
    public constructor() { }

    async ngOnInit() {
        Observable.fromEvent(this.filter.nativeElement, 'keyup')
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(() => {
                this.matTableDataSource.filter = this.filter.nativeElement.value;
            });

        this.selection.onChange.subscribe((event) => {
            if (event.added.length > 0) {
                this.onSelectRow.emit(event.added[0]);
            }
        });
    }

    ngOnChanges(changes) {
        if (changes.data) {
            if (changes.data.currentValue) {
                this.matTableDataSource!.data = changes.data.currentValue;
            }
        }
    }

    /** Whether all filtered rows are selected. */
    isAllFilteredRowsSelected() {
        return this.matTableDataSource.filteredData.every(data => this.selection.isSelected(data));
    }

    /** Whether the selection it totally matches the filtered rows. */
    isMasterToggleChecked() {
        return this.selection.hasValue() &&
            this.isAllFilteredRowsSelected() &&
            this.selection.selected.length >= this.matTableDataSource.filteredData.length;
    }

    /**
     * Whether there is a selection that doesn't capture all the
     * filtered rows there are no filtered rows displayed.
     */
    isMasterToggleIndeterminate() {
        return this.selection.hasValue() &&
            (!this.isAllFilteredRowsSelected() || !this.matTableDataSource.filteredData.length);
    }

    /** Selects all filtered rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        if (this.isMasterToggleChecked()) {
            this.selection.clear();
        } else {
            this.matTableDataSource.filteredData.forEach(data => this.selection.select(data));
        }
    }

    handleRowSelect(row) {
        if (this.allowSelection) {
            this.selection.toggle(row);
        }

        if (this.onSelectRow) {
            this.onSelectRow.emit(row);
        }
    }

    actionButtonClick() {
        this.onSubmit.emit(this.selection.selected);
    }
}
