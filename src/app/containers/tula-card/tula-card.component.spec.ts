import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TulaCardComponent } from './tula-card.component';

describe('TulaCardComponent', () => {
  let component: TulaCardComponent;
  let fixture: ComponentFixture<TulaCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TulaCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TulaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
