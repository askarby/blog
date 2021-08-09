import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { FeedbackButtonComponent } from './feedback-button.component';
import { MockComponents } from 'ng-mocks';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

describe('FeedbackButtonComponent', () => {
  const createComponent = createComponentFactory({
    component: FeedbackButtonComponent,
    declarations: [MockComponents(FaIconComponent)],
  });

  let spectator: Spectator<FeedbackButtonComponent>;
  let component: FeedbackButtonComponent;

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should be created', () => {
    expect(spectator.component).toBeTruthy();
  });
});
