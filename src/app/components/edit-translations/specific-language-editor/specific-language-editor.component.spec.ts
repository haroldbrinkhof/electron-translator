import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificLanguageEditorComponent } from './specific-language-editor.component';

describe('SpecificLanguageEditorComponent', () => {
  let component: SpecificLanguageEditorComponent;
  let fixture: ComponentFixture<SpecificLanguageEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificLanguageEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificLanguageEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
