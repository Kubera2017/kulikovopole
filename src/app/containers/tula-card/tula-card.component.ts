import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import { MuseumService } from '../../services/museum.service';
import { LangService } from '../../services/lang.service';

@Component({
  selector: 'app-tula-card',
  templateUrl: './tula-card.component.html',
  styleUrls: ['./tula-card.component.css']
})
export class TulaCardComponent implements OnInit {

  blockMap: any;
  content: any;
  isDataReady = false;

  constructor(
    private route: ActivatedRoute,
    private museums: MuseumService,
    private lang: LangService
  ) { }

  ngOnInit() {
    this.route
      .data
      .subscribe(data => {
        this.content = this.museums.getMuseum(data[this.lang.selected.lang].data.entity.code);
        console.log(this.content);
        this.isDataReady = true;
      });
  }


  getObjectTitle() {
    return this.content.item[this.lang.selected.lang].data.filter(elem => elem.attribute === 'object_title')[0].value[0];
  }

  getAddress() {
    return this.content.item[this.lang.selected.lang].data.filter(elem => elem.attribute === 'address')[0].value[0];
  }

  getPhone() {
    return this.content.item[this.lang.selected.lang].data.filter(elem => elem.attribute === 'phone')[0].value[0];
  }

  getAnons() {
    return this.content.item[this.lang.selected.lang].data.filter(elem => elem.attribute === 'anons')[0].value[0];
  }

  getDescription() {
    return this.content.item[this.lang.selected.lang].data.filter(elem => elem.attribute === 'description')[0].value[0];
  }

  getEmail() {
    return this.content.item[this.lang.selected.lang].data.filter(elem => elem.attribute === 'links_mailto')[0].value[0].url;
  }

  getSocialNetwork() {
    return this.content.item[this.lang.selected.lang].rawData[this.lang.selected.lang].social_network.list_item;
  }

  getSlides() {
    return this.content.item[this.lang.selected.lang].rawData[this.lang.selected.lang].image_gallery.image;
  }

  getOpeningHours() {
    const season = this.content.item[this.lang.selected.lang].rawData[this.lang.selected.lang].opening_hours.season;
    return season.filter(elem => elem.current)[0];
  }

  getCoordinates() {
    return this.content.item[this.lang.selected.lang].data.filter(elem => elem.attribute === 'coordinates')[0].value[0];
  }

  getCoordinatesCenter() {
    return this.content[this.lang.selected.lang].data.filter(elem => elem.attribute === 'coordinates_center')[0].value[0];
  }

  getScale() {
    return this.content.item[this.lang.selected.lang].data.filter(elem => elem.attribute === 'scale')[0].value[0];
  }

  getImage() {
    return this.content.item[this.lang.selected.lang].rawData[this.lang.selected.lang].image_main.image.path;
  }

  getMuseumType() {
    return this.content.item[this.lang.selected.lang].data.filter(elem => elem.attribute === 'museum_type')[0].data[0].title;
  }

  getAccessEnv() {
    return this.content.item[this.lang.selected.lang].rawData[this.lang.selected.lang].access_env.list_item;
  }

  getExhibits() {
    const exhibits = this.content.item[this.lang.selected.lang].data.filter(elem => elem.attribute === 'exhibits')[0];
    if (exhibits) {
      return exhibits.data;
    } else {
      return [];
    }
  }

  getExhibitsTitle() {
    const title = this.content.item[this.lang.selected.lang].data.filter(elem => elem.attribute === 'exhibits_title')[0];
    if (title) {
      return title.value[0];
    } else {
      return '';
    }
  }

  getMuseum() {
    return this.content;
  }

}
