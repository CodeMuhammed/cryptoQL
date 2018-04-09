import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { Coin } from 'app/shared/models';

@Injectable()
export class CoinsService {
    constructor(
        private afsDB: FirestoreService
    ) {}

    public getCoin(coinId: string) {
        let userId: string = localStorage.getItem('user_id');
        let ref: string = `/users/${userId}/coins/${coinId}`;

        return this.afsDB.docWithId$(ref);
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
}
