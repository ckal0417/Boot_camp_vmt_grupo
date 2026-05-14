import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesLists } from './courses-lists';

describe('CoursesLists', () => {
  let component: CoursesLists;
  let fixture: ComponentFixture<CoursesLists>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesLists],
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesLists);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
