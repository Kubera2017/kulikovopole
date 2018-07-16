import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonsComponent } from './anons.component';

describe('AnonsComponent', () => {
  let component: AnonsComponent;
  let fixture: ComponentFixture<AnonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
