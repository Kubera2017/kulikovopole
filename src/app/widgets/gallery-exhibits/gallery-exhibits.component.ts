import { Component, Input, AfterViewInit, OnDestroy, OnChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';

import { Config } from '../../config';

@Component({
  selector: 'app-gallery-exhibits',
  templateUrl: './gallery-exhibits.component.html',
  styleUrls: ['./gallery-exhibits.component.css']
})
export class GalleryExhibitsComponent implements AfterViewInit, OnChanges, OnDestroy {

  private imageUrl = Config.apiUrl;

  @Input() exhibits: any[];
  @Input() title: string;

  elemWidth = 432;
  elemHeight = 2000;

  elemWidthLarge = 864;
  elemHeightLarge = 2000;


  constructor(
    private mScrollbarService: MalihuScrollbarService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnChanges() {
    console.log(this.exhibits);
    this.exhibits.forEach(element => {
      element.imageL = this.sanitizer.
      bypassSecurityTrustResourceUrl(`${this.imageUrl}${element.image}?w=${this.elemWidthLarge}&h=${this.elemHeightLarge}`);
      element.image = this.sanitizer.
      bypassSecurityTrustResourceUrl(`${this.imageUrl}${element.image}?w=${this.elemWidth}&h=${this.elemHeight}`);
    });
  }



  ngAfterViewInit() {
    this.mScrollbarService.initScrollbar('#exhibits', {
      theme: 'dark',
      alwaysShowScrollbar: 1,
      axis: 'x',
      scrollbarPosition: 'outside',
      mouseWheel: {
        enable: false
      }
    });
  }

  ngOnDestroy() {
    this.mScrollbarService.destroy('#exhibits');
  }

}
