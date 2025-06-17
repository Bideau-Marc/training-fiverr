import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleReceipe } from './single-receipe';

describe('SingleReceipe', () => {
  let component: SingleReceipe;
  let fixture: ComponentFixture<SingleReceipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleReceipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleReceipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
