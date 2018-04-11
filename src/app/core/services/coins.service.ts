import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { Coin, Account } from 'app/shared/models';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CoinsService {
    constructor(
        private afsDB: FirestoreService
    ) { }

    public getCoin(coinId: string): Observable<Coin> {
        let userId: string = localStorage.getItem('user_id');
        let ref: string = `/users/${userId}/coins/${coinId}`;

        return this.afsDB.docWithId$(ref);
    }

    public getAllCoins() {
        let userId: string = localStorage.getItem('user_id');
        let ref: string = `/users/${userId}/coins`;

        return this.afsDB.colWithIds$(ref);
    }

    public updateCoin(coin: Coin) {
        let userId: string = localStorage.getItem('user_id');
        let ref: string = `/users/${userId}/coins/${coin.id}`;

        return this.afsDB.doc(ref).update(coin);
    }

    public createCoin(coin: Coin) {
        let userId: string = localStorage.getItem('user_id');
        let ref: string = `/users/${userId}/coins`;

        return this.afsDB.col(ref).add(coin);
    }

    public getCoinAccounts(coinId: string) {
        let userId: string = localStorage.getItem('user_id');
        let ref: string = `/users/${userId}/coins/${coinId}/accounts`;

        return this.afsDB.colWithIds$(ref);
    }

    public addAccount(account: Account, coinId: string): Promise<any> {
        let userId: string = localStorage.getItem('user_id')
        let ref: string = `/users/${userId}/coins/${coinId}/accounts`;
        
        return this.afsDB.col(ref).add(account);
    }

    public updateAccount(account: Account, coinId: string): Promise<any> {
        let userId: string = localStorage.getItem('user_id')
        let ref: string = `/users/${userId}/coins/${coinId}/accounts/${account.id}`;
        
        return this.afsDB.doc(ref).update(account);
    }

    public deleteAccount(accountId: string, coinId: string): Promise<any> {
        let userId: string = localStorage.getItem('user_id')
        let ref: string = `/users/${userId}/coins/${coinId}/accounts/${accountId}`;
        
        return this.afsDB.doc(ref).delete();
    }
}
