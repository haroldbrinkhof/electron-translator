import { TestBed } from '@angular/core/testing';

import { TranslationFileHandlerService } from './translation-file-handler.service';

describe('TranslationFileHandlerService', () => {
  let service: TranslationFileHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslationFileHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
