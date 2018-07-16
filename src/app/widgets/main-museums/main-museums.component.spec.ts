import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMuseumsComponent } from './main-museums.component';

describe('MainMuseumsComponent', () => {
  let component: MainMuseumsComponent;
  let fixture: ComponentFixture<MainMuseumsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainMuseumsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMuseumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
