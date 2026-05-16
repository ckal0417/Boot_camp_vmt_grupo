import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefsForm } from './chefs-form';

describe('ChefsForm', () => {

  let component: ChefsForm;
  let fixture: ComponentFixture<ChefsForm>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [ChefsForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ChefsForm);
    component = fixture.componentInstance;

    await fixture.whenStable();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});