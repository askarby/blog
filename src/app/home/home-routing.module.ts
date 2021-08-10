import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      licenses: [
        {
          forItem: 'header image',
          from: 'pixabay',
          url: 'https://pixabay.com/photos/coding-computer-hacker-hacking-1841550/',
        },
        {
          forItem: 'MIT license logo',
          from: 'public-domain',
          url: 'https://commons.wikimedia.org/wiki/File:MIT_logo.svg',
        },
        {
          forItem: 'The Open Source Initiative keyhole image',
          from: 'Wikimedia Commons',
          licenseType: 'CC-BY-2.5',
          url: 'https://commons.wikimedia.org/wiki/File:Open_Source_Initiative_keyhole.svg',
        },
      ],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
