// tslint:disable-next-line:max-line-length
import { Directive, EventEmitter, OnChanges, OnDestroy, SimpleChange, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { YaMapsAPIWrapper } from '../ya-maps-api-wrapper';
import * as mapTypes from '../ya-maps-types';
import { MarkerManager } from '../services/managers/marker-manager';
import { Marker } from '../ya-maps-types';

let markerId = 0;

@Directive({
  selector: 'ya-marker',
  providers: [
    YaMapsAPIWrapper
  ]
})

// tslint:disable-next-line:directive-class-suffix
export class YaMarker implements OnChanges, OnDestroy {
  @Input() public latitude: number;
  @Input() public longitude: number;
  @Input() public balloonLayout: any;
  @Input() public balloonContentHeader: string;
  @Input() public balloonContentBody: string;
  @Input() public balloonContentFooter: string;
  @Input() public draggable: boolean = false;
  @Input() public preset: string = 'islands#blueIcon';
  @Input() public iconContent: string;
  @Input() public showInfo: boolean;
  // default#image
  @Input() public iconLayout: any;
  @Input() public iconImageHref: any;
  @Input() public hoverIconImageHref: any;
  // [30, 42]
  @Input() public iconImageSize: any;
  // [-5, -38]
  @Input() public iconImageOffset: any;

  @Output() public markerClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() public markerMouseEnter: EventEmitter<mapTypes.MapMouseEnterEvent> = new EventEmitter<mapTypes.MapMouseEnterEvent>();
  @Output() public markerMouseLeave: EventEmitter<mapTypes.MapMouseLeaveEvent> = new EventEmitter<mapTypes.MapMouseLeaveEvent>();

  // tslint:disable-next-line:max-line-length
  @Output() public dragEnd: EventEmitter<mapTypes.MapMouseEvent> = new EventEmitter<mapTypes.MapMouseEvent>();

  private _markerAddedToManger: boolean = false;
  private _id: string;
  private _observableSubscriptions: Subscription[] = [];

  constructor(private _markerManager: MarkerManager) {
    this._id = (markerId++).toString();
  }

  public ngOnChanges(changes: { [key: string]: SimpleChange }) {
    if (!this._markerAddedToManger) {
      // console.log(this.iconImageHref);
      this._markerManager.addMarker(this);
      this._markerAddedToManger = true;
      this._addEventListeners();
      return;
    }
    if (changes['showInfo']) {
      this._markerManager.showBalloon(this);
    }
    if (changes['iconImageHref']) {
      this._markerManager.changeIcon(this, this.iconImageHref);
    }
  }

  public ngOnDestroy() {
    this._markerManager.deleteMarker(this);
    this._observableSubscriptions.forEach((s) => s.unsubscribe());
  }

  private _addEventListeners() {
    // click event
    const cs = this._markerManager.createEventObservable('click', this).subscribe(() => {
      this._markerManager.showBalloon(this);
      this.markerClick.emit(null);
    });
    // Mouse Enter Event
    const mouseenter = this._markerManager.createEventObservable('mouseenter', this).subscribe((e: mapTypes.MapMouseEnterEvent) => {
      e.get('target').options.set('iconImageHref', this.hoverIconImageHref);
    });
    this._observableSubscriptions.push(mouseenter);
    const mouseleave = this._markerManager.createEventObservable('mouseleave', this).subscribe((e: mapTypes.MapMouseLeaveEvent) => {
      e.get('target').options.set('iconImageHref', this.iconImageHref);
    });
    this._observableSubscriptions.push(mouseenter);
    // dragend event
    // tslint:disable-next-line:max-line-length
    const ds = this._markerManager.createEventObservable<mapTypes.MouseEvent>('dragend', this).subscribe((e: mapTypes.MouseEvent) => {

      const thisPlacemark = e.get('target');
      const coords = thisPlacemark.geometry.getCoordinates();
      this._markerManager.getNativeMarker(this).then((m: Marker) => {
        // tslint:disable-next-line:max-line-length
        this.dragEnd.emit({ lat: coords[0], lng: coords[1], nativeMarker: m } as mapTypes.MapMouseEvent);
      });
    });
    this._observableSubscriptions.push(ds);
  }
}
