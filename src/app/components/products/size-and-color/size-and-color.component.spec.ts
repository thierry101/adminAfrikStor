import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeAndColorComponent } from './size-and-color.component';

describe('SizeAndColorComponent', () => {
  let component: SizeAndColorComponent;
  let fixture: ComponentFixture<SizeAndColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SizeAndColorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeAndColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
