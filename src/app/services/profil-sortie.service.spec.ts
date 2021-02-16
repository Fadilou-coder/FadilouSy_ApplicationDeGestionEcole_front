import { TestBed } from '@angular/core/testing';

import { ProfilSortieService } from './profil-sortie.service';

describe('ProfilSortieService', () => {
  let service: ProfilSortieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilSortieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
