import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ENVIRONMENT_TOKEN } from './shared/di.tokens';
import { Environment } from '../environments/environment.model';
import { LicenseInfoService } from './shared/services/license-info.service';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LicenseItem } from './models/license-info.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  menuShown = false;
  licenseItems$: Observable<LicenseItem[]>;

  private destroy$ = new Subject<void>();

  constructor(
    @Inject(ENVIRONMENT_TOKEN) public environment: Environment,
    private licenseInfoService: LicenseInfoService,
    private router: Router
  ) {
    this.licenseItems$ = licenseInfoService.activeRouteLicenses$;
  }

  ngOnInit(): void {
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.menuShown = false;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleMenu(): void {
    this.menuShown = !this.menuShown;
  }
}
