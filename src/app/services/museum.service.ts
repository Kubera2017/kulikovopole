import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { LangService } from './lang.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class MuseumService {

  museums = [];

  constructor(
    private api: ApiService,
    private lang: LangService
  ) {
   }

  getMuseum(code: string) {
    return this.museums.filter(museum => museum.code === code)[0];
  }

  getAll() {
    return this.museums;
  }

  loadMuseums () {
    return new Promise((resolve, reject) => {
      this.api.searchEntities('MUSEUM', this.lang.langs[0])
      .subscribe(response => {
        const newData = [];
        const populate = [];
        const langs = [];
        const museumsList = JSON.parse(JSON.stringify(response)).data;
        museumsList.forEach(museum => {
            newData.push({code: museum.id, item: {}});
            this.lang.langs.forEach(langEntry => {
              populate.push(this.api.getEntity({type: 'MUSEUM', code: museum.id}, langEntry.lang));
              langs.push({lang: langEntry.lang, code: museum.id});
            });
        });
        Observable.forkJoin(populate).subscribe(
          populateResponse => {
            const newMuseumsList = JSON.parse(JSON.stringify(populateResponse));
            newMuseumsList.forEach((museumEntry, i) => {
              newData.filter(data => data.code === museumEntry.id)[0].item[langs[i].lang] = museumEntry;
            });
            newData.forEach(data => this.museums.push(data));
            console.log('Museum service: ', this.museums);
            resolve(true);
          },
          err => {
            console.log(err);
            reject(err);
          }
        );
      },
      err => {
        console.log(err);
      });
    });
  }

}
