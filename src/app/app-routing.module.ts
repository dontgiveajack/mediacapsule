import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogueComponent } from './layout/catalogue/catalogue.component';
import { SettingsComponent } from './layout/settings/settings.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { CatalogueAssetComponent } from './layout/catalogue-asset/catalogue-asset.component';
import { SecondPageComponent } from './layout/second-page/second-page.component';
import { ScreeningRoomComponent } from './layout/screening-room/screening-room.component';
import { PublicLayoutComponent } from './public/public-layout/public-layout.component';
import { DiscussionComponent } from './layout/screening-room/discussion/discussion.component';
import { ClipsComponent } from './layout/screening-room/clips/clips.component';
import { LoginComponent } from './public/login/login.component';
import { SignupComponent } from './public/signup/signup.component';
import { UnlockComponent } from './public/unlock/unlock.component';
import { ConfirmComponent } from './public/confirm/confirm.component';
import { ForgotPasswordComponent } from './public/forgot-password/forgot-password.component';
import { AuthGuardService } from './guards/auth-guard.service';

import { FourOhFourComponent } from './public/four-oh-four/four-oh-four.component';
import { DomainListComponent } from './layout/sa/domain-list/domain-list.component';
import { DomainDetailsComponent } from './layout/sa/domain-details/domain-details.component';
import { ServiceAvailabilityComponent } from './layout/sa/service-availability/service-availability.component';
import { ServiceNoticeComponent } from './layout/sa/service-notice/service-notice.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    component: LayoutComponent,
    children: [
      { path: '', component: DashboardComponent, pathMatch: 'full' },
      { path: 'catalogue', component: CatalogueComponent },
      { path: 'catalogue/:id', component: CatalogueComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'second', component: SecondPageComponent },
      { path: 'screening-room-discussion', component: DiscussionComponent },
      { path: 'catalogue/a', component: CatalogueAssetComponent },
      { path: 'catalogue/a/:id', component: CatalogueAssetComponent },
      { path: 'screening-room', component: ScreeningRoomComponent },
      { path: 'clips', component: ClipsComponent },
    ]
  },
  {
    path: 'public',
    component: PublicLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'unlock', component: UnlockComponent },
      { path: 'confirm', component: ConfirmComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent }
    ]
  },
  {
    path: 'sa',
    component: LayoutComponent,
    children: [
      { path: 'domains', component: DomainListComponent },
      { path: 'domains/:id', component: DomainDetailsComponent },
      { path: 'service-notice', component: ServiceNoticeComponent },
      { path: 'service-availability', component: ServiceAvailabilityComponent }
    ]
  },
  { path: '**', component: FourOhFourComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
