import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobShellComponent } from './job-shell.component';

describe('JobShellComponent', () => {
  let component: JobShellComponent;
  let fixture: ComponentFixture<JobShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
