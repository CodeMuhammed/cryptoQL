import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {
    AngularFirestore,
    AngularFirestoreDocument,
    AngularFirestoreCollection
} from 'angularfire2/firestore';

type collectionPredicate<T> = string | AngularFirestoreCollection<T>;
type DocPredicate<T>        = string | AngularFirestoreDocument<T>;

@Injectable()
export class FirestoreService {
    constructor(private afs: AngularFirestore) { }

    col<T>(ref: collectionPredicate<T>, queryfn?): AngularFirestoreCollection<T> {
        return typeof ref === 'string' ? this.afs.collection<T>(ref, queryfn) : ref;
    }

    doc<T>(ref: DocPredicate<T>): AngularFirestoreDocument<T> {
        return typeof ref === 'string' ? this.afs.doc<T>(ref) : ref;
    }

    doc$<T>(ref: DocPredicate<T>): Observable<T> {
        return this.doc(ref).snapshotChanges().map((doc) => {
            let data;
            if(doc.payload.exists) {
                data = doc.payload.data();
            }
            return data as T;
        });
    }

    docWithId$<T>(ref: DocPredicate<T>): Observable<T> {
        return this.doc(ref).snapshotChanges().map((doc) => {
            let data;
            if(doc.payload.exists) {
                data = doc.payload.data();
                data.id = doc.payload.id;
            }

            return data as T;
        });
    }

    docsFromId$<T>(ref: collectionPredicate<T>, ids: string[]): Observable<T[]> {
      let colRef = this.col(ref).ref.path;
      let refs = ids.map(id => `/${colRef}/${id}`);

      return this.docsFromRefs$(refs);
    }

    docsFromRefs$<T>(refs): Observable<T[]> {
        return Observable.of(refs)
            .map((refs) => {
                return refs.map((ref) => {
                    ref = this.doc(ref).ref.path;
                    return this.docWithId$(ref)
                });
            })
            .flatMap((res) => {
                if (res.length !== 0) {
                    return Observable.combineLatest(res);
                } else {
                    return Observable.of([]);
                }
            })
    }

    cols$<T>(ref: collectionPredicate<T>, queryfn?): Observable<T[]> {
        return this.col(ref, queryfn).snapshotChanges().map(docs => {
            return docs.map((doc) => {
                return doc.payload.doc.data();
            }) as T[];
        });
    }

    colWithIds$<T>(ref: collectionPredicate<T>, queryfn?): Observable<T[]> {
        return this.col(ref, queryfn).snapshotChanges().map(docs => {
            return docs.map((doc) => {
                const data = doc.payload.doc.data();
                data.id = doc.payload.doc.id;
                return data;
            }) as T[];
        });
    }   
}
