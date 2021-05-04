import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './shell/navigation-bar/navigation-bar.component';
import { SlideOutMenuComponent } from './shell/slide-out-menu/slide-out-menu.component';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { NavigationListComponent } from './shell/navigation-list/navigation-list.component';
import { DOCUMENT_TOKEN, ENVIRONMENT_TOKEN, WINDOW_TOKEN } from './di.tokens';
import { environment } from '../../environments/environment';
import { MonthNamePipe } from './pipes/month-name.pipe';

@NgModule({
  imports: [CommonModule, RouterModule, ScullyLibModule, FontAwesomeModule],
  declarations: [
    NavigationBarComponent,
    SlideOutMenuComponent,
    NavigationListComponent,
    MonthNamePipe,
  ],
  exports: [NavigationBarComponent, SlideOutMenuComponent, MonthNamePipe],
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        {
          provide: ENVIRONMENT_TOKEN,
          useValue: environment,
        },
        {
          provide: WINDOW_TOKEN,
          useValue: window,
        },
        {
          provide: DOCUMENT_TOKEN,
          useValue: document,
        },
      ],
    };
  }
}
