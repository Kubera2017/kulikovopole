import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import { LangService } from '../../services/lang.service';
import { ApiService } from '../../services/api.service';

import { Config } from '../../config';

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.css']
})
export class MainMapComponent implements OnInit {

  @Input() museumObjects: any;

  allInfrastructure = [];

  isDataReady = false;

  constructor(
    private api: ApiService,
    private lang: LangService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getAllInfrastructure();
    this.isDataReady = true;
  }

  getMuseumImages(value: string) {
    switch (value) {
      // Красном холме
      case '8604743':
        return {
          img: this.sanitizer.bypassSecurityTrustStyle(`url(/assets/images/buildings-map/1.svg)`),
          hover: this.sanitizer.bypassSecurityTrustStyle(`url(/assets/images/buildings-map/1-hover.svg)`)
        };
      // Музей Куликовской битвы
      case '8604760':
        return {
          img: this.sanitizer.bypassSecurityTrustStyle(`url(/assets/images/buildings-map/2.svg)`),
          hover: this.sanitizer.bypassSecurityTrustStyle(`url(/assets/images/buildings-map/2-hover.svg)`)
        };
      // Музей купеческого быта
      case '8604745':
        return {
          img: this.sanitizer.bypassSecurityTrustStyle(`url(/assets/images/buildings-map/5.svg)`),
          hover: this.sanitizer.bypassSecurityTrustStyle(`url(/assets/images/buildings-map/5-hover.svg)`)
        };
      // На слиянии Дона
      case '8604605':
        return {
          img: this.sanitizer.bypassSecurityTrustStyle(`url(/assets/images/buildings-map/4.svg)`),
          hover: this.sanitizer.bypassSecurityTrustStyle(`url(/assets/images/buildings-map/4-hover.svg)`)
        };
    }
  }

  getMuseumTitle(value: string) {
    return this.museumObjects.filter(museum => museum.value === value)[0].title;
  }

  getAllInfrastructure () {
    this.museumObjects.forEach(museum => {
      this.lang.langs.forEach(langEntry => {
        const infrastructure = museum.item[langEntry.lang]
        .rawData[langEntry.lang].infrastructure.list_item.filter(object => object.visible_main === '1');
        if (infrastructure) {
          infrastructure.forEach(entry => {
            let existedObject = false;
            for (let i = 0; i < this.allInfrastructure.length; i++) {
              if (this.allInfrastructure[i].code === entry.code) {
                existedObject = true;
                if (!this.allInfrastructure[i][langEntry.lang]) {
                  this.allInfrastructure[i][langEntry.lang] = entry;
                }
              }
            }
            if (!existedObject) {
              const newObject = {};
              newObject['code'] = entry.code;
              newObject[langEntry.lang] = entry;
              newObject['active'] = false;
              this.allInfrastructure.push(newObject);
            }
          });
        }
      });
    });
  }

  getMuseumInfrastructure(value: string) {
    const infrastructure = this.museumObjects
    .filter(museum => museum.value === value)[0].item[this.lang.selected.lang].rawData[this.lang.selected.lang].infrastructure;
    if (infrastructure) {
      return infrastructure.list_item.filter(object => object.visible_main === '1');
    } else {
      return [];
    }
  }

  getInfrastructureIcon(element: any) {
    if (element.icon_2) {
      if (element.icon_2.media[0]) {
        const iconUrl = Config.apiUrl + element.icon_2.media.filter(image => !image.hover)[0].path + '#';
        return iconUrl;
      } else {
        const iconUrl = Config.apiUrl + element.icon_2.media.path + '#';
        return iconUrl;
      }
    } else {
      return '';
    }
  }

  getFacilityTitle(facility: any) {
    return facility[this.lang.selected.lang].name;
  }

  getFacilityIcon(facility: any) {
    if (facility[this.lang.selected.lang].icon_2) {
      if (facility[this.lang.selected.lang].icon_2.media[0]) {
        const iconUrl = Config.apiUrl + facility[this.lang.selected.lang].icon_2.media.filter(image => !image.hover)[0].path + '#';
        return iconUrl;
      } else {
        const iconUrl = Config.apiUrl + facility[this.lang.selected.lang].icon_2.media.path + '#';
        return iconUrl;
      }
    } else {
      return '';
    }
  }

  isActive(id) {
    if (this.allInfrastructure.filter(entry => entry.code === id)[0].active) {
      return true;
    } else {
      return false;
    }
  }

  activateFacility(facility: any) {
    const item = this.allInfrastructure.filter(entry => entry.code === facility)[0];
    item.active = true;
  }

  deactivateFacility(facility: any) {
    const item = this.allInfrastructure.filter(entry => entry.code === facility)[0];
    item.active = false;
  }

}
