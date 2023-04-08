import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnCommandComponent } from './own-command.component';

describe('OwnCommandComponent', () => {
  let component: OwnCommandComponent;
  let fixture: ComponentFixture<OwnCommandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnCommandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
