import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {
    constructor(private http: Http) { }

    request(url, options) {
        return  this.http.request(url, options).map(this.parseData);
    }

    private parseData(res: Response)  {
        return res.json() || [];
    }

    private addDefaultHeaders() {
        return new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
    }

    get(url: string) {
        let headers = this.addDefaultHeaders();
        let options = new RequestOptions({
            headers,
            method: 'GET'
        });

        return this.request(url, options).toPromise();
    }

    post(url: string, body: any) {
        let headers = this.addDefaultHeaders();
        let options = new RequestOptions({
            headers,
            method: 'POST',
            body
        });

        return this.request(url, options).toPromise();
    }
}