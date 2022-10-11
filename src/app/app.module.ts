import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../app/helpers/token-interceptor';

import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CatalogueComponent } from './layout/catalogue/catalogue.component';
import { SettingsComponent } from './layout/settings/settings.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { CatalogueAssetComponent } from './layout/catalogue-asset/catalogue-asset.component';
import { SecondPageComponent } from './layout/second-page/second-page.component';
import { ScreeningRoomComponent } from './layout/screening-room/screening-room.component';
import { DiscussionComponent } from './layout/screening-room/discussion/discussion.component';
import { ClipsComponent } from './layout/screening-room/clips/clips.component';
import { CatalogFileElementComponent } from './shared/catalog-file-element/catalog-file-element.component';
import { CatalogFolderElementComponent } from './shared/catalog-folder-element/catalog-folder-element.component';
import { PageHeaderComponent } from './layout/page-header/page-header.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PublicLayoutComponent } from './public/public-layout/public-layout.component';
import { LoginComponent } from './public/login/login.component';
import { SignupComponent } from './public/signup/signup.component';
import { ForgotPasswordComponent } from './public/forgot-password/forgot-password.component';
import { ConfirmComponent } from './public/confirm/confirm.component';
import { UnlockComponent } from './public/unlock/unlock.component';
import { FourOhFourComponent } from './public/four-oh-four/four-oh-four.component';

// UI stuff - NGX
import { NgxFileDropModule } from 'ngx-file-drop';

// UI stuff - PrimeNG
import { CardModule } from 'primeng/card';
import { TreeModule } from 'primeng/tree';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { SpinnerModule } from 'primeng/spinner';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DragDropModule } from 'primeng/dragdrop';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { FileUploadModule } from 'primeng/fileupload';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectFolderModalComponent } from './dialogs/select-folder-modal/select-folder-modal.component';
import { SingleLineEntryComponent } from './dialogs/single-line-entry/single-line-entry.component';


import { UploadDropComponent } from './layout/components/upload-drop/upload-drop.component';
import { UploadComponentComponent } from './layout/components/upload-component/upload-component.component';
import { AssetMetadataDisplayComponent } from './shared/asset-metadata-display/asset-metadata-display.component';
import { VideoMp4Component } from './layout/catalogue-asset/preview/video-mp4/video-mp4.component';

import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { ApplicationPdfComponent } from './layout/catalogue-asset/preview/application-pdf/application-pdf.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DomainListComponent } from './layout/sa/domain-list/domain-list.component';
import { DomainDetailsComponent } from './layout/sa/domain-details/domain-details.component';
import { ServiceAvailabilityComponent } from './layout/sa/service-availability/service-availability.component';
import { ServiceNoticeComponent } from './layout/sa/service-notice/service-notice.component';

@NgModule({
  declarations: [
    AppComponent,
    CatalogueComponent,
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    SettingsComponent,
    DashboardComponent,
    CatalogueAssetComponent,
    SecondPageComponent,
    ScreeningRoomComponent,
    DiscussionComponent,
    ClipsComponent,
    CatalogFileElementComponent,
    CatalogFolderElementComponent,
    PageHeaderComponent,
    UploadDropComponent,
    UploadComponentComponent,
    PublicLayoutComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ConfirmComponent,
    UnlockComponent,
    FourOhFourComponent,
    SelectFolderModalComponent,
    SingleLineEntryComponent,
    AssetMetadataDisplayComponent,
    VideoMp4Component,
    DomainListComponent,
    DomainDetailsComponent,
    ServiceAvailabilityComponent,
    ApplicationPdfComponent,
    ServiceNoticeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ChartsModule,
    NgxDatatableModule,
    BrowserAnimationsModule,
    CardModule,
    TableModule,
    DragDropModule,
    DynamicDialogModule,
    DropdownModule,
    PaginatorModule,
    TreeModule,
    PanelModule,
    ButtonModule,
    FileUploadModule,
    ToastModule,
    BreadcrumbModule,
    NgxFileDropModule,
    PdfJsViewerModule,
    ConfirmDialogModule,
    TabViewModule,
    SpinnerModule,
    InputSwitchModule,
    ScrollPanelModule,
    CheckboxModule,
    CalendarModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  entryComponents: [
    SelectFolderModalComponent,
    SingleLineEntryComponent
  ]
})
export class AppModule { }
