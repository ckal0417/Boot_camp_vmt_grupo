import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponents } from './header-components';

describe('HeaderComponents', () => {
  let component: HeaderComponents;
  let fixture: ComponentFixture<HeaderComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponents],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
