import { NgModule } from '@angular/core';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { NavigationListComponent } from './navigation-list/navigation-list.component';
import { PageFooterComponent } from './page-footer/page-footer.component';
import { SlideOutMenuComponent } from './slide-out-menu/slide-out-menu.component';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from '../components/shared-components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    SharedComponentsModule,
  ],
  declarations: [
    NavigationBarComponent,
    NavigationListComponent,
    PageFooterComponent,
    SlideOutMenuComponent,
  ],
  exports: [NavigationBarComponent, PageFooterComponent, SlideOutMenuComponent],
})
export class ShellModule {}
