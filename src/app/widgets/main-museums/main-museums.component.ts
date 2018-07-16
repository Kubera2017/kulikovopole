import { Component, OnInit, Input } from '@angular/core';

import { LangService } from '../../services/lang.service';

@Component({
  selector: 'app-main-museums',
  templateUrl: './main-museums.component.html',
  styleUrls: ['./main-museums.component.css']
})
export class MainMuseumsComponent implements OnInit {


  @Input() museumObjects: any;

  constructor(
    private lang: LangService
  ) { }

  ngOnInit() {
    // console.log(this.museumObjects);
  }

  getMuseumImages(value: string) {
    switch (value) {
      case '8604743':
        return {
          img: '1.png',
          img2x: '1@2x.png',
          hover: '1-hover.png',
          hover2x: '1-hover@2x.png'
        };
      case '8604760':
        return {
          img: '7.png',
          img2x: '7@2x.png',
          hover: '7-hover.png',
          hover2x: '7-hover@2x.png'
        };
      case '8604605':
        return {
          img: '4.png',
          img2x: '4@2x.png',
          hover: '4-hover.png',
          hover2x: '4-hover@2x.png'
        };
      case '8604745':
        return {
          img: '5.png',
          img2x: '5@2x.png',
          hover: '5-hover.png',
          hover2x: '5-hover@2x.png'
        };
    }
  }

  onClickMuseum(e, value: string) {
    e.preventDefault();
    e.stopPropagation();
    console.log(value);
  }

}
