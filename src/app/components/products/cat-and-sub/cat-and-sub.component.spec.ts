import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatAndSubComponent } from './cat-and-sub.component';

describe('CatAndSubComponent', () => {
  let component: CatAndSubComponent;
  let fixture: ComponentFixture<CatAndSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatAndSubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatAndSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
