import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRootComponent } from './change-root.component';

describe('ChangeRootComponent', () => {
  let component: ChangeRootComponent;
  let fixture: ComponentFixture<ChangeRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
