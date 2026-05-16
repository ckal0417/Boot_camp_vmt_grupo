import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesDialogue } from './recipes-dialogue';

describe('RecipesDialogue', () => {
  let component: RecipesDialogue;
  let fixture: ComponentFixture<RecipesDialogue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipesDialogue],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipesDialogue);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
