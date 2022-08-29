import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LovedComponent } from './loved.component';

describe('LovedComponent', () => {
  let component: LovedComponent;
  let fixture: ComponentFixture<LovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LovedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
