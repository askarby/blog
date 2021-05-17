import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about.component';
import { LicenseItem } from '../models/license-info.model';

const routes: Routes = [
  {
    path: '',
    component: AboutComponent,
    data: {
      licenses: [
        {
          forItem: 'header image',
          from: 'Pixabay',
          url:
            'https://pixabay.com/illustrations/background-abstract-about-the-smoke-805060/',
        } as LicenseItem,
      ],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutRoutingModule {}
