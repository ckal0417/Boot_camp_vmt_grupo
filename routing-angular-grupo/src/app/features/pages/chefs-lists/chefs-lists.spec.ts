import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefsLists } from './chefs-lists';

describe('ChefsLists', () => {

  let component: ChefsLists;
  let fixture: ComponentFixture<ChefsLists>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [ChefsLists],
    }).compileComponents();

    fixture = TestBed.createComponent(ChefsLists);
    component = fixture.componentInstance;

    await fixture.whenStable();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});