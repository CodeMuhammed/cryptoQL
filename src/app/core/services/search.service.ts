import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import 'rxjs/add/operator/debounceTime';

// shared searchService for common search functions
// to be shared within trainerComponent + child modules
@Injectable()
export class SearchService {

  // Observable string sources
  private searchParentSource = new Subject<string>();

  // Observable string streams
  public searchParentSource$ = this.searchParentSource.asObservable().debounceTime(700);

  // Service message commands
  public setParentSearchItem(searchQuery: string) {
    this.searchParentSource.next(searchQuery);
  }
}
