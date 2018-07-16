import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import { ApiService } from '../../services/api.service';
import { LangService } from '../../services/lang.service';
import { MuseumService } from '../../services/museum.service';
import { SettingsService } from '../../services/settings.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  content = {};
  isDataReady = false;

  constructor(
    private api: ApiService,
    private lang: LangService,
    private settings: SettingsService,
    private museums: MuseumService
  ) { }

  ngOnInit() {
    const footer = this.settings.currentSettings.site_map.filter(route => route.template === '' && route.url === '')[0]
    .content;
    console.log(footer);
    const populate = [];
    const langs = [];
    for (const langEnt in footer) {
      if (footer.hasOwnProperty(langEnt)) {
        populate.push(this.api
          .getEntity({type: footer[langEnt].data.entity.type, code: footer[langEnt].data.entity.code}, langEnt));
          langs.push(langEnt);
      }
    }
    Observable.forkJoin(populate).subscribe(
      response => {
        console.log(response);
        response.forEach((footerForLang, i) => {
          this.content[langs[i]] = footerForLang;
        });
        for (const langEnt in this.content) {
          if (this.content.hasOwnProperty(langEnt)) {
            this.content[langEnt].data.filter(elem => elem.attribute === 'museum_objects')[0]
            .data.forEach((museum) => {
              museum.item = this.museums.getMuseum(museum.value).item;
            });
          }
        }
        console.log(this.content);
        this.isDataReady = true;
      },
      err => {
        console.log(err);
      }
    );
  }

  getPhone() {
    return this.content[this.lang.selected.lang].rawData[this.lang.selected.lang].items.phone.text;
  }

  getPhoneText1() {
    return this.content[this.lang.selected.lang].rawData[this.lang.selected.lang].items.phone_text_1.text;
  }
  getPhoneText2() {
    return this.content[this.lang.selected.lang].rawData[this.lang.selected.lang].items.phone_text_2.text;
  }

  getCopyright() {
    return this.content[this.lang.selected.lang].rawData[this.lang.selected.lang].items.copyright.text;
  }

  getTermsUseText() {
    return this.content[this.lang.selected.lang].rawData[this.lang.selected.lang].items.terms_use.text;
  }

  getTermsUsePath() {
    return this.content[this.lang.selected.lang].rawData[this.lang.selected.lang].items.terms_use.path;
  }

  getCommHours() {
    return this.content[this.lang.selected.lang].rawData[this.lang.selected.lang].items.comm_hours.text;
  }

  getMuseums() {
    return this.content[this.lang.selected.lang].data.filter(elem => elem.attribute === 'museum_objects')[0].data;
  }

  getMuseumTitle(i: number) {
    const museum = this.content[this.lang.selected.lang].data.filter(elem => elem.attribute === 'museum_objects')[0]
    .data[i].item;
    if (museum[this.lang.selected.lang]) {
      return museum[this.lang.selected.lang].rawData[this.lang.selected.lang].object_title_footer;
    } else {
      return '';
    }
  }

  getMuseumAddress(i: number) {
    return this.content[this.lang.selected.lang].data.filter(elem => elem.attribute === 'museum_objects')[0]
    .data[i].item[this.lang.selected.lang].data.filter(elem => elem.attribute === 'address')[0].value[0];
  }

  getMuseumCoords(i: number) {
    return this.content[this.lang.selected.lang].data.filter(elem => elem.attribute === 'museum_objects')[0]
    .data[i].item[this.lang.selected.lang].data
    .filter(elem => elem.attribute === 'coordinates')[0].value[0];
  }

  getMuseumHours(i: number) {
    /* const season = this.content[this.lang.selected.lang].data.filter(elem => elem.attribute === 'museum_objects')[0].data[i].item
    .rawData[this.lang.selected.lang].opening_hours.season;
    // console.log(season);
    return season.filter(elem => elem.current)[0];*/
    const hours_footer = this.content[this.lang.selected.lang].data.filter(elem => elem.attribute === 'museum_objects')[0]
    .data[i].item[this.lang.selected.lang].
    rawData[this.lang.selected.lang].opening_hours.season;
    // // console.log(hours_footer);
    if (hours_footer[0]) {
      return hours_footer.filter(season => season.current && season.current === '1')[0].hours_footer;
    } else {
      return hours_footer.hours_footer;
    }
    // return hours_footer;
    // return this.content[this.lang.selected.lang].data.filter(elem => elem.attribute === 'museum_objects')[0].data[i].item.data
    // .filter(elem => elem.attribute === 'opening_hours')[0].value[0];
    // return '';
  }

}
