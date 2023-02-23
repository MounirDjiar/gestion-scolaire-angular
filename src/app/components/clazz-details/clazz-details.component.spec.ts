import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClazzDetailsComponent } from './clazz-details.component';

describe('ClazzDetailsComponent', () => {
  let component: ClazzDetailsComponent;
  let fixture: ComponentFixture<ClazzDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClazzDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClazzDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
