import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerNavComponent } from './seeker-nav.component';

describe('SeekerNavComponent', () => {
  let component: SeekerNavComponent;
  let fixture: ComponentFixture<SeekerNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeekerNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeekerNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
