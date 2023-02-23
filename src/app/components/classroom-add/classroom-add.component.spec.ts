import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomAddComponent } from './classroom-add.component';

describe('ClassroomListComponent', () => {
  let component: ClassroomAddComponent;
  let fixture: ComponentFixture<ClassroomAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassroomAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassroomAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
