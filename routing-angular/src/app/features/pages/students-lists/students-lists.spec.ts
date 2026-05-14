import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsLists } from './students-lists';

describe('StudentsLists', () => {
  let component: StudentsLists;
  let fixture: ComponentFixture<StudentsLists>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsLists],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentsLists);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
