import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryExhibitsComponent } from './gallery-exhibits.component';

describe('GalleryExhibitsComponent', () => {
  let component: GalleryExhibitsComponent;
  let fixture: ComponentFixture<GalleryExhibitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryExhibitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryExhibitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
