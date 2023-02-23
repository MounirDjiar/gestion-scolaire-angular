import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolParamComponent } from './school-param.component';

describe('SchoolParamComponent', () => {
  let component: SchoolParamComponent;
  let fixture: ComponentFixture<SchoolParamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolParamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
