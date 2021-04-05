import { Component, Inject } from '@angular/core';
import { ENVIRONMENT_TOKEN } from './shared/di.tokens';
import { Environment } from '../environments/environment.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  menuShown = false;

  constructor(@Inject(ENVIRONMENT_TOKEN) public environment: Environment) {}

  toggleMenu(): void {
    this.menuShown = !this.menuShown;
  }
}
