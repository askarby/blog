import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { RouterModule } from '@angular/router';
import {
  DOCUMENT_TOKEN,
  ENVIRONMENT_TOKEN,
  LOCAL_STORAGE_TOKEN,
  SESSION_STORAGE_TOKEN,
  WINDOW_TOKEN,
} from './di.tokens';
import { environment } from '../../environments/environment';
import { MonthNamePipe } from './pipes/month-name.pipe';
import { SharedComponentsModule } from './components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ScullyLibModule,
    SharedComponentsModule,
  ],
  declarations: [MonthNamePipe],
  exports: [MonthNamePipe, SharedComponentsModule],
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
        {
          provide: LOCAL_STORAGE_TOKEN,
          useValue: window.localStorage,
        },
        {
          provide: SESSION_STORAGE_TOKEN,
          useValue: window.sessionStorage,
        },
      ],
    };
  }
}
