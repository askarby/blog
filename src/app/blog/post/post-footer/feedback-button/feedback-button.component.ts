import { Component, Input } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-feedback-button',
  templateUrl: './feedback-button.component.html',
  styleUrls: ['./feedback-button.component.scss'],
})
export class FeedbackButtonComponent {
  @Input()
  icon!: IconProp;

  @Input()
  title!: string;

  @Input()
  url!: string;
}
