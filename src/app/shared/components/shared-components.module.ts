import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialMediaComponent } from './social-media/social-media.component';
import { ToggleSwitchComponent } from './toggle-switch/toggle-switch.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: [SocialMediaComponent, ToggleSwitchComponent],
  exports: [SocialMediaComponent, ToggleSwitchComponent],
})
export class SharedComponentsModule {}
