import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReferentielComponent } from './list-referentiel.component';

describe('ListReferentielComponent', () => {
  let component: ListReferentielComponent;
  let fixture: ComponentFixture<ListReferentielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReferentielComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReferentielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
