import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVisitPageComponent } from './my-visit-page.component';

describe('MyVisitPageComponent', () => {
  let component: MyVisitPageComponent;
  let fixture: ComponentFixture<MyVisitPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyVisitPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyVisitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
