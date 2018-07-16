import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextWithLinksComponent } from './text-with-links.component';

describe('TextWithLinksComponent', () => {
  let component: TextWithLinksComponent;
  let fixture: ComponentFixture<TextWithLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextWithLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextWithLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
