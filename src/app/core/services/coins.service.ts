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





    crone() {
        let str = 
        `


        `;

        let emails = str.split(',').map(e => e.trim());
        let userId: string = localStorage.getItem('user_id')
        
        setTimeout(async () => {
            console.log('lets go');
            for(let email of emails) {
            let account: Account =  {
                email,
                password: 'Naturecreate99.',
                ethAddress: '0x9d6585961457503871587E42804b2D134E57fEf4',
                totalCoins: 100,
                claimed: false
            }
            await this.addAccount(account, 'XXXCkQY6aEVw5cKp2Enp');
            console.log(email, 'added');
        }

         console.log('Done');
        }, 5000);
    }
}
