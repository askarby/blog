import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { LicenseItem } from '../models/license-info.model';

const headerImageLicense: LicenseItem = {
  forItem: 'header image',
  from: 'pixabay',
  url: 'https://pixabay.com/photos/coding-computer-hacker-hacking-1841550/',
};

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      licenses: [headerImageLicense],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
