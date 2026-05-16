import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChefsDialogue } from './chefs-dialogue';

describe('ChefsDialogue', () => {

  let component: ChefsDialogue;
  let fixture: ComponentFixture<ChefsDialogue>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [ChefsDialogue],
    }).compileComponents();

    fixture = TestBed.createComponent(ChefsDialogue);
    component = fixture.componentInstance;

    await fixture.whenStable();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});