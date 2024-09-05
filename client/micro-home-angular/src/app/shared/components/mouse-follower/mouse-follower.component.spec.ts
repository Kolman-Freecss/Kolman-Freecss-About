import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MouseFollowerComponent } from './mouse-follower.component';

describe('MouseFollowerComponent', () => {
  let component: MouseFollowerComponent;
  let fixture: ComponentFixture<MouseFollowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MouseFollowerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MouseFollowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
