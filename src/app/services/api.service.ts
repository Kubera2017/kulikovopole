import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Config } from './../config';


@Injectable()
export class ApiService {

  private apiUrl = Config.apiUrl + '/api';

  constructor(
    private http: HttpClient
  ) { }

  public getSettings(): Observable<any> {
    const url = this.apiUrl + `/settings`;
    return this.http.get(url);
  }

  public getEntity(entity: any, lang: string) {
    const url = this.apiUrl + `/entity/${entity.type}/${entity.code}?raw=true`;
    const headers = new HttpHeaders().set('Accept-Language', lang);
    // console.log(url);
    return this.http.get(url, { headers: headers });
  }

  public searchEntities(entity: string, lang: string) {
    const url = this.apiUrl + `/searchEntities/${entity}?raw=true`;
    const headers = new HttpHeaders().set('Accept-Language', lang);
    // console.log(url);
    return this.http.post(url, {}, { headers: headers });
  }


}
