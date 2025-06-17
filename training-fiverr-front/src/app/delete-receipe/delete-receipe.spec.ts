import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReceipe } from './delete-receipe';

describe('DeleteReceipe', () => {
  let component: DeleteReceipe;
  let fixture: ComponentFixture<DeleteReceipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteReceipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteReceipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
