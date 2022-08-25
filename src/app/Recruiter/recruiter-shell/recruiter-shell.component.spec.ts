import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterShellComponent } from './recruiter-shell.component';

describe('RecruiterShellComponent', () => {
  let component: RecruiterShellComponent;
  let fixture: ComponentFixture<RecruiterShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruiterShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
