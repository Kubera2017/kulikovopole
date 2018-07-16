import { Injectable } from '@angular/core';

@Injectable()
export class LangService {

  public langs = [];

  public selected: any;

  constructor() { }

  setLangs(langs: any[]) {
    langs.forEach(element => {
      for (const key in element) {
        if (element.hasOwnProperty(key)) {
          this.langs.push({
            lang: key,
            title: element[key]
          });
        }
      }
    });
    this.selected = this.langs[0];
  }

  switchLang() {
    if (this.selected.lang === this.langs[0].lang) {
      this.selected = this.langs[1];
    } else {
      this.selected = this.langs[0];
    }
  }

}
