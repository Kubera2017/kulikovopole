import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { ApiService } from './api.service';
import { LangService } from './lang.service';
import { MuseumService } from './museum.service';


import { MainPageComponent } from '../containers/main-page/main-page.component';
import { TulaCardComponent } from '../containers/tula-card/tula-card.component';
import { MuseumComponent } from '../containers/museum/museum.component';
import { EventsCardComponent } from '../containers/events-card/events-card.component';
import { EventsListComponent } from '../containers/events-list/events-list.component';
import { MuseumListComponent } from '../containers/museum-list/museum-list.component';
import { MyVisitPageComponent } from '../containers/my-visit-page/my-visit-page.component';
import { PromoPageComponent } from '../containers/promo-page/promo-page.component';
import { TextPageComponent } from '../containers/text-page/text-page.component';



@Injectable()
export class SettingsService {

  currentSettings: any;

  templates = {
    'MAIN_PAGE': MainPageComponent,
    'TULA_CARD': TulaCardComponent,
    'MUSEUM_CARD': MuseumComponent,
    'EVENTS_LIST': EventsListComponent,
    'TEXT_PAGE': TextPageComponent,
    'MUSEUM_LIST': MuseumListComponent,
    'PROMO_PAGE': PromoPageComponent,
    'MYVISIT_PAGE': MyVisitPageComponent,
    'EVENTS_CARD': EventsCardComponent
  };

  routes = [];


  constructor(
    private injector: Injector,
    private api: ApiService,
    private lang: LangService,
    private museums: MuseumService

  ) { }

  makeRoute(parent: string, route_elem: any) {
    const path = `${parent === '' ? '' : parent + '/'}${route_elem.url}`;
    this.routes.push(
      {
        path: path,
        component: this.templates[route_elem.template],
        data: route_elem.content,
        pathMatch: 'full'
      }
    );
    if (route_elem.children.length > 0) {
      return route_elem.children.forEach(child => {
        this.makeRoute(path, child);
      });
    } else {
      return;
    }
  }

  createRoutes(site_map: any) {
    site_map.forEach(element => {
      if  (element.template.length > 0) {
        this.makeRoute('', element);
      }
    });
  }

  loadSettings(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
          const router = this.injector.get(Router);
          console.log(router);
          this.api.getSettings()
          .subscribe(
            response => {
              this.currentSettings = response;
              console.log(this.currentSettings);
              // languages
              this.lang.setLangs(this.currentSettings.languages);
              // routes
              /*this.currentSettings.site_map.forEach(element => {
                if  (element.template.length > 0) {
                  router.config.push({
                    path: `${element.url}`,
                    component: this.templates[element.template],
                    data: element.content
                  });
                }
              });*/
              this.createRoutes(this.currentSettings.site_map);
              this.routes.forEach(route =>  router.config.push(route));
              console.log(router);
              this.museums.loadMuseums()
              .then(() => {
                resolve(true);
              })
              .catch((err) => {
                console.log(err);
                reject(false);
              });
            },
            err => {
              console.log(err);
              reject(false);
            }
          );
      });
    });
  }
}
