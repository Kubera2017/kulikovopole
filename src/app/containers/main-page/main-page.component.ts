import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import { ApiService } from '../../services/api.service';
import { LangService } from '../../services/lang.service';
import { MuseumService } from '../../services/museum.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  blockMap: any;
  content = {};
  isDataReady = false;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private lang: LangService,
    private museums: MuseumService
  ) { }

  ngOnInit() {
    this.route
    .data
    .subscribe(data => {
      this.blockMap = data;
      console.log(this.blockMap);
      const populate = [];
      const langs = [];
      for (const lang in this.blockMap) {
        if (this.blockMap.hasOwnProperty(lang)) {
          populate.push(this.api.getEntity(this.blockMap[lang].data.entity, lang));
          langs.push(lang);
        }
      }
      Observable.forkJoin(populate).subscribe(
        response => {
          console.log('Backend answer:');
          console.log(response);
          response.forEach((langContent, i) => {
            this.content[langs[i]] = langContent;
          });
          console.log(this.content);

          // Populate museums
          for (const langEnt in this.content) {
            if (this.content.hasOwnProperty(langEnt)) {
              this.content[langEnt].data.filter(elem => elem.attribute === 'museum_objects')[0]
              .data.forEach((museum, i) => {
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
    });
  }

  getAnons() {
    return this.content[this.lang.selected.lang].data.filter(elem => elem.attribute === 'anons')[0].value[0];
  }

  getAnons2() {
    return this.content[this.lang.selected.lang].data.filter(elem => elem.attribute === 'anons2')[0].value[0];
  }

  getEmail() {
    // return this.content[this.lang.selected.lang].data.filter(elem => elem.attribute === 'links_mailto')[0].value[0].url;
    return 'disabled';
  }

  getSocialNetwork() {
    return this.content[this.lang.selected.lang].rawData[this.lang.selected.lang].social_network.list_item;
  }

  getMuseumObjects() {
    return this.content[this.lang.selected.lang].data.filter(elem => elem.attribute === 'museum_objects')[0].data;
  }


}
