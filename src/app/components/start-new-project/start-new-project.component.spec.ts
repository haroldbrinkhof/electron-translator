import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartNewProjectComponent } from './start-new-project.component';

describe('StartNewProjectComponent', () => {
  let component: StartNewProjectComponent;
  let fixture: ComponentFixture<StartNewProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartNewProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartNewProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
