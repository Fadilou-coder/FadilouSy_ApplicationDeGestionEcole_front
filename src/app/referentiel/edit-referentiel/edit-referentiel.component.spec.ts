import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReferentielComponent } from './edit-referentiel.component';

describe('EditReferentielComponent', () => {
  let component: EditReferentielComponent;
  let fixture: ComponentFixture<EditReferentielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditReferentielComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReferentielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
