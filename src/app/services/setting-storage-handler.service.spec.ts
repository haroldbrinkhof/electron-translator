import { TestBed } from '@angular/core/testing';

import { SettingStorageHandlerService } from './setting-storage-handler.service';

describe('SettingStorageHandlerService', () => {
  let service: SettingStorageHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingStorageHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
