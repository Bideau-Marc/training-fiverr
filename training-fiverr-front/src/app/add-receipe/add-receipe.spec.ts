import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReceipe } from './add-receipe';

describe('AddReceipe', () => {
  let component: AddReceipe;
  let fixture: ComponentFixture<AddReceipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddReceipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReceipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
