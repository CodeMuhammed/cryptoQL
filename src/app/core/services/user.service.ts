import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FirestoreService } from './firestore.service';

@Injectable()
export class UserService {
    public constructor(
        private afsDB: FirestoreService
    ) { }
}
