import { Injectable } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    public redirectUrl = '';
    private authState: any = null;
    private isFirstAuth: boolean = true;
    public authState$: any;

    public constructor(
        private afAuth: AngularFireAuth,
        private router: Router
    ) {
        this.authState$ = this.afAuth.auth;
        this.authState$.onAuthStateChanged(auth => {
            this.authState = auth;

            if (this.isFirstAuth) {
                // we can show the loading screen @TODO
                setTimeout(() => {
                    this.isFirstAuth = false;
                    let url = this.authState ? '/portfolio' : '/auth';
                    this.router.navigateByUrl(url);
                }, 300);
            }
        });
    }

    public register(user: any) {
        // noinspection TypeScriptUnresolvedFunction
        return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    }

    public login(email, password) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    }

    public loginSocial(socialNetwork: string) {
        switch (socialNetwork) {
            case 'google': return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        }
    }

    public getUserId() {
        return this.authState && this.authState.uid;
    }

    public isLoggedIn() {
        return !!this.authState && !!this.authState.uid;
    }

    public logout() {
        return this.afAuth.auth.signOut();
    }

    public resetPassword(email: string) {
        return firebase.auth().sendPasswordResetEmail(email);
    }
}
