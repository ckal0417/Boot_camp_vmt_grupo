import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsDialogue } from './students-dialogue';

describe('StudentsDialogue', () => {
  let component: StudentsDialogue;
  let fixture: ComponentFixture<StudentsDialogue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsDialogue],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentsDialogue);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
