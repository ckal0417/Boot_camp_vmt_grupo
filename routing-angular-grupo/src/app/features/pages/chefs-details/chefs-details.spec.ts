import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChefsDetails } from './chefs-details';

describe('ChefsDetails', () => {

  let component: ChefsDetails;
  let fixture: ComponentFixture<ChefsDetails>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [ChefsDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(ChefsDetails);
    component = fixture.componentInstance;

    await fixture.whenStable();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});