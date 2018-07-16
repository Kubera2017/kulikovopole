import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InverseBannerSliderComponent } from './inverse-banner-slider.component';

describe('InverseBannerSliderComponent', () => {
  let component: InverseBannerSliderComponent;
  let fixture: ComponentFixture<InverseBannerSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InverseBannerSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InverseBannerSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
