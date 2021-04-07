import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './shell/navigation-bar/navigation-bar.component';
import { SlideOutMenuComponent } from './shell/slide-out-menu/slide-out-menu.component';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { NavigationListComponent } from './shell/navigation-list/navigation-list.component';

@NgModule({
  imports: [CommonModule, RouterModule, ScullyLibModule, FontAwesomeModule],
  declarations: [
    NavigationBarComponent,
    SlideOutMenuComponent,
    NavigationListComponent,
  ],
  exports: [NavigationBarComponent, SlideOutMenuComponent],
})
export class SharedModule {}
