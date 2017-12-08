import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Parent } from './parent.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ParentService {

    private resourceUrl = '/accountmanagercoot/api/parents';

    constructor(private http: Http) { }

    create(parent: Parent): Observable<Parent> {
        const copy = this.convert(parent);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(parent: Parent): Observable<Parent> {
        const copy = this.convert(parent);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Parent> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Parent.
     */
    private convertItemFromServer(json: any): Parent {
        const entity: Parent = Object.assign(new Parent(), json);
        return entity;
    }

    /**
     * Convert a Parent to a JSON which can be sent to the server.
     */
    private convert(parent: Parent): Parent {
        const copy: Parent = Object.assign({}, parent);
        return copy;
    }
}
