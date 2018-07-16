import { Component, OnChanges, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Config } from '../../config';

@Component({
  selector: 'app-inverse-banner-slider',
  templateUrl: './inverse-banner-slider.component.html',
  styleUrls: ['./inverse-banner-slider.component.css']
})
export class InverseBannerSliderComponent implements OnChanges {

  private imageUrl = Config.apiUrl;

  @Input() objectTitle: any;
  @Input() address: any;
  @Input() phone: any;
  @Input() slides: any;
  @Input() openingHours;

  index = 0;
  timer: any;
  reloadTime = 6000;

  slideWidth = 1400;
  slideHeight = 450;

  nextSlide() {
    const count = this.slides.length;
    this.index = (count + this.index + 1) % count;
  }

  setSlide(newIndex) {
    console.log(newIndex);
    clearInterval(this.timer);
    this.index = newIndex;
    this.timer = setInterval(() => {
      this.nextSlide();
    }, this.reloadTime);
  }


  constructor(private sanitizer: DomSanitizer) { }

  ngOnChanges() {
    console.log(this.openingHours);
    this.slides.forEach(element => {
      element.url = this.sanitizer
      .bypassSecurityTrustStyle(`url(${this.imageUrl}${element.path}?w=${this.slideWidth}&h=${this.slideHeight})`);
    });
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = setInterval(() => {
      this.nextSlide();
    }, this.reloadTime);
  }



  onClickToSlide(e, i) {
    e.preventDefault();
    e.stopPropagation();
  }

}
