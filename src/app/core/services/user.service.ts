import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FirestoreService } from './firestore.service';
import { User } from 'app/shared/models';
import 'rxjs/add/operator/take';

@Injectable()
export class UserService {
    public constructor(
        private afsDB: FirestoreService
    ) { }

    public getUserByEmail(email: string): Promise<User> {
        return new Promise((resolve) => {
            this.afsDB.colWithIds$('/users', (ref) => {
                return ref.where('email', '==', email).limit(1);
            }).take(1).subscribe((res: User[]) => {
                resolve(res[0]);
            });
        });
    }

    public saveUser(user: User): Promise<any> {
        return this.afsDB.col('/users').add(user);
    }
}
