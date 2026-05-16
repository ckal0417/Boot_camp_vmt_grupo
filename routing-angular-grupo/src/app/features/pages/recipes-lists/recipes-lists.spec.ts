import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipesLists } from './recipes-lists';

describe('RecipesLists', () => {

  let component: RecipesLists;
  let fixture: ComponentFixture<RecipesLists>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [RecipesLists],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipesLists);
    component = fixture.componentInstance;

    await fixture.whenStable();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});