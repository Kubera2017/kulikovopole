import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import { Config } from '../../config';

import { MuseumService } from '../../services/museum.service';
import { LangService } from '../../services/lang.service';


@Component({
  selector: 'app-map-description',
  templateUrl: './map-description.component.html',
  styleUrls: ['./map-description.component.css']
})
export class MapDescriptionComponent implements OnInit {

  private imageUrl = Config.apiUrl;

  @Input() museum: any;
  @Input() showOtherObjects: boolean;

  x1: number;
  y1: number;
  x2: number;
  y2: number;

  coordsObject = {
    lat: null,
    long: null
  };

  coordsCenterObject = {
    lat: null,
    long: null
  };
  controls = ['zoomControl'];
  iconLayout = 'default#image';
  iconImageHref = '/assets/images/pins/museum@2x.png';
  iconImageSize = [28, 38];
  iconImageOffset = [0, 0];

  image: any;

  imageWidth = 260;
  imageHeight = 154;
  AccessEnvCodes = {
    'mental': '8604785',
    'legs': '8604747',
    'wheel': '8604639',
    'vision': '8604642',
    'hear': '8604645'
  };

  accessEnv = [];

  mapObjects = [];
  activeObject: number;

  isDataReady = false;



  constructor(
    private sanitizer: DomSanitizer,
    private museums: MuseumService,
    private lang: LangService
  ) { }



  ngOnInit() {
    console.log(this.museum);
    this.coordsCenterObject = this.makeCoords(this.getCoordinatesCenter());
    if (this.showOtherObjects) {
          this.mapObjects = this.museums.getAll();
          this.isDataReady = true;
      } else {
        this.mapObjects.push(this.museum);
      this.isDataReady = true;
    }
  }

  makeCoords(coordsString: string) {
    const coord = coordsString.match(/[-]?[0-9]+([.]?[,]?[0-9]+)?/gi);
    return {
      lat: coord[0],
      long: coord[1]
    };
  }


  onClickMarker(i) {
    // console.log(i);
    this.activeObject = i;
  }

  getObjectIcon(i) {
    if (i === this.activeObject) {
      return this.getMarkerHoverIcon(i);
    } else {
      return this.getMarkerIcon(i);
    }
  }

  getMarkerIcon(index: number) {
    let icon = this.getMapObjects()[index].item[this.lang.selected.lang]
    .rawData[this.lang.selected.lang].museum_type;
    if (icon) {
      if (icon.list_item[0]) {
        icon = icon.list_item[0];
      } else {
        icon = icon.list_item;
      }
      if (icon.icon_1) {
        icon = icon.icon_1;
        if (icon.media) {
          if (icon.media[0]) {
            icon = icon.media.filter(item => !item.hover)[0];
            if (icon) {
              return this.imageUrl + icon.path;
            } else {
              return this.imageUrl + icon.media[0].path;
            }
          } else {
            return this.imageUrl + icon.media.path;
          }
        } else {
          return null;
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  getMarkerHoverIcon(index: number) {
    let icon = this.getMapObjects()[index].item[this.lang.selected.lang]
    .rawData[this.lang.selected.lang].museum_type;
    if (icon) {
      if (icon.list_item[0]) {
        icon = icon.list_item[0];
      } else {
        icon = icon.list_item;
      }
      if (icon.icon_1) {
        icon = icon.icon_1;
        if (icon.media) {
          if (icon.media[0]) {
            icon = icon.media.filter(item => item.hover && item.hover === '1')[0];
            if (icon) {
              return this.imageUrl + icon.path;
            } else {
              return this.imageUrl + icon.media[0].path;
            }
          } else {
            return this.imageUrl + icon.media.path;
          }
        } else {
          return null;
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  getMapObjects() {
    const museums = [];
    this.mapObjects.forEach(museum => {
      if (museum.item[this.lang.selected.lang].data.filter(attr => attr.attribute === 'coordinates')) {
        const mapObject = museum;
        if (this.isObjectInBounds(mapObject)) {
          museums.push(mapObject);
        }
      }
    });
    // console.log(museums);
    return museums;
  }

  getObjectImage(index: number) {
    let image = this.getMapObjects()[index].item[this.lang.selected.lang]
    .rawData[this.lang.selected.lang].image_main;
    // console.log(image);
    if (image) {
      image = image.image.path;
      image = this.sanitizer
      .bypassSecurityTrustStyle(`url(${this.imageUrl}${image}?w=${this.imageWidth}&h=${this.imageHeight})`);
      return image;
    } else {
      return null;
    }
  }

  getObjectType(index: number) {
    const type = this.getMapObjects()[index].item[this.lang.selected.lang]
    .data.filter(elem => elem.attribute === 'museum_type')[0];
    if (type) {
      return type.data[0].title;
    } else {
      return '';
    }
  }

  getObjectTitle(index: number) {
    const title = this.getMapObjects()[index].item[this.lang.selected.lang]
    .data.filter(elem => elem.attribute === 'object_title')[0];
    if (title) {
      return title.value[0];
    } else {
      return '';
    }
  }

  getObjectAddress(index: number) {
    const address = this.getMapObjects()[index].item[this.lang.selected.lang]
    .data.filter(elem => elem.attribute === 'address')[0];
    if (address) {
      return address.value[0];
    } else {
      return '';
    }
  }

  getObjectPhone(index: number) {
    const phone = this.getMapObjects()[index].item[this.lang.selected.lang]
    .data.filter(elem => elem.attribute === 'phone')[0];
    if (phone) {
      return phone.value[0];
    } else {
      return '';
    }
  }

  getObjectOpeningHours(index: number) {
    const opening_hours = this.getMapObjects()[index].item[this.lang.selected.lang]
    .rawData[this.lang.selected.lang].opening_hours;
    if (opening_hours) {
      if (opening_hours.season[0]) {
        return opening_hours.season.filter(season => season.current && season.current === '1')[0].hours;
      } else {
        return opening_hours.season.hours;
      }
    } else {
      return '';
    }
  }

  getObjectAccessEnv(index: number) {
    const access_env = this.getMapObjects()[index].item[this.lang.selected.lang]
    .rawData[this.lang.selected.lang].access_env;
    if (access_env) {
      return access_env.list_item;
    } else {
      return [];
    }
  }

  getAllAccessEnv() {
    const allEnv = [];
    const allMuseums = this.museums.getAll();
    allMuseums.forEach(museum => {
      const access_env = museum.item[this.lang.selected.lang]
      .rawData[this.lang.selected.lang].access_env;
      if (access_env) {
        access_env.list_item.forEach(element => {
          if (allEnv.filter (env => env.code === element.code).length === 0) {
            allEnv.push(element);
          }
        });
      }
    });
    return allEnv;
  }

  getAccessIcon(env: any) {
    return this.imageUrl + env.icon_1.media.path + '#';
  }

  isAccessEnabled(index: number, code: string) {
    if (this.getObjectAccessEnv(index).filter(access => access.code === code).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  getCoords(mapObject: any) {
    const coordsString = mapObject.item[this.lang.selected.lang].data.filter(attr => attr.attribute === 'coordinates')[0].value[0];
    return this.makeCoords(coordsString);
  }


  getCoordinatesCenter() {
    return this.museum.item[this.lang.selected.lang].data.filter(elem => elem.attribute === 'coordinates_center')[0].value[0];
  }

  getScale() {
    return this.museum.item[this.lang.selected.lang].data.filter(elem => elem.attribute === 'scale')[0].value[0];
  }


  prevMuseum() {
    const count = this.getMapObjects().length;
    this.activeObject = (count + this.activeObject - 1) % count;
    // console.log(this.activeObject);
  }

  nextMuseum() {
    const count = this.getMapObjects().length;
    this.activeObject = (count + this.activeObject + 1) % count;
    // console.log(this.activeObject);
  }

  isObjectInBounds(mapObject: any) {
    const coords = this.getCoords(mapObject);
    if (parseFloat(coords.lat) > this.x1
    && parseFloat(coords.lat) < this.x2
    && parseFloat(coords.long) > this.y1
    && parseFloat(coords.long) < this.y2) {
      return true;
    } else {
      return false;
    }
  }

  onBoundsChange(e) {
    let oldMuseum;
    if (this.activeObject >= 0 && this.activeObject) {
      oldMuseum = this.getMapObjects()[this.activeObject];
    }

    this.x1 = e.newBounds[0][0];
    this.y1 = e.newBounds[0][1];
    this.x2 = e.newBounds[1][0];
    this.y2 = e.newBounds[1][1];

    if (!this.activeObject) {
      for (let i = 0; i < this.getMapObjects().length; i++) {
        if (this.getMapObjects()[i].item[this.lang.selected.lang].id === this.museum.code) {
          this.activeObject = i;
          break;
        }
      }
    }

    if (oldMuseum) {
      let existed = false;
      for (let i = 0; i < this.getMapObjects().length; i++) {
        if (this.getMapObjects()[i].item[this.lang.selected.lang].id === oldMuseum.id) {
          this.activeObject = i;
          existed = true;
          break;
        }
      }
      if (!existed) {
        if (this.mapObjects.length > 0) {
          this.activeObject = 0;
        } else {
          this.activeObject = null;
        }
      }
    }
  }

  getSliderClass () {
    const count = this.getMapObjects().length;
    const elem = document.getElementsByClassName('map-description__sidebar__slides')[0];
    let width = 0;
    if (elem) {
      width = elem.clientWidth;
    }
    const index = (this.activeObject % count + count) % count;
    const offset = width * index * -1;
    // console.log(width, index, offset);
    return {
      webkitTransform: this.sanitizer.bypassSecurityTrustStyle('translateX(' + offset + 'px) translateZ(0)'),
      mozTransform: this.sanitizer.bypassSecurityTrustStyle('translateX(' + offset + 'px) translateZ(0)'),
      transform: this.sanitizer.bypassSecurityTrustStyle('translateX(' + offset + 'px) translateZ(0)')
    };
  }

}
