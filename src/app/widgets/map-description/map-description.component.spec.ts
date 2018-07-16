import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDescriptionComponent } from './map-description.component';

describe('MapDescriptionComponent', () => {
  let component: MapDescriptionComponent;
  let fixture: ComponentFixture<MapDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
