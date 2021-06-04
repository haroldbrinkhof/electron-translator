import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameProjectComponent } from './name-project.component';

describe('NameProjectComponent', () => {
  let component: NameProjectComponent;
  let fixture: ComponentFixture<NameProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NameProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NameProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
