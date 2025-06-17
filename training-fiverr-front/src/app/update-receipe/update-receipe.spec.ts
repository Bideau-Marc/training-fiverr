import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReceipe } from './update-receipe';

describe('UpdateReceipe', () => {
  let component: UpdateReceipe;
  let fixture: ComponentFixture<UpdateReceipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateReceipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateReceipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
