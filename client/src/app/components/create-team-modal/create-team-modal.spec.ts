import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTeamModal } from './create-team-modal';

describe('CreateTeamModal', () => {
  let component: CreateTeamModal;
  let fixture: ComponentFixture<CreateTeamModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTeamModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTeamModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
