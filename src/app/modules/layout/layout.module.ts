import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';

import { NavbarComponent } from 'src/app/components/publics/navbar/navbar.component';
import { SidebarComponent } from 'src/app/components/publics/sidebar/sidebar.component';
import { LayoutComponent } from 'src/app/components/layout/layout.component';
import { DashboardComponent } from 'src/app/components/admin/dashboard/dashboard.component';
import { FooterComponent } from 'src/app/components/publics/footer/footer.component';
import { ChartComponent } from 'src/app/components/admin/chart/chart.component';
import { CatAndSubComponent } from 'src/app/components/products/cat-and-sub/cat-and-sub.component';
import { AddEditCatSubComponent } from 'src/app/components/products/cat-and-sub/add-edit-cat-sub/add-edit-cat-sub.component';
import { SizeAndColorComponent } from 'src/app/components/products/size-and-color/size-and-color.component';
import { AddEditSizColComponent } from 'src/app/components/products/size-and-color/add-edit-siz-col/add-edit-siz-col.component';
import { ProductsComponent } from 'src/app/components/products/products/products.component';
import { AddEditProductComponent } from 'src/app/components/products/products/add-edit-product/add-edit-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrandComponent } from 'src/app/components/products/brand/brand.component';
import { VadidateProductsComponent } from 'src/app/components/admin/vadidate-products/vadidate-products.component';
import { ConfidentialityComponent } from 'src/app/components/admin/confidentiality/confidentiality.component';
import { SettingsComponent } from 'src/app/components/admin/settings/settings.component';
import { AdvertisingComponent } from 'src/app/components/admin/advertising/advertising.component';
import { ProvidersComponent } from 'src/app/components/admin/providers/providers.component';
import { AdminSiteComponent } from 'src/app/components/admin/admin-site/admin-site.component';
import { UserProfileComponent } from 'src/app/components/authentication/user-profile/user-profile.component';
import { ImagePipe } from 'src/app/pipes/image.pipe';
import { MultiImgPipe } from 'src/app/pipes/multi-img.pipe';
import { CouponComponent } from 'src/app/components/admin/coupon/coupon.component';
import { HandleCommandComponent } from 'src/app/components/admin/handle-command/handle-command.component';
import { MessageComponent } from 'src/app/components/admin/message/message.component';
import { BlogComponent } from 'src/app/components/admin/blog/blog.component';
import { SpinnerComponent } from 'src/app/components/publics/spinner/spinner.component';
import { RejectsComponent } from 'src/app/components/products/rejects/rejects.component';
import { OwnCommandComponent } from 'src/app/components/products/own-command/own-command.component';



@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    LayoutComponent,
    DashboardComponent,
    FooterComponent,
    ChartComponent,
    CatAndSubComponent,
    AddEditCatSubComponent,
    SizeAndColorComponent,
    AddEditSizColComponent,
    ProductsComponent,
    AddEditProductComponent,
    BrandComponent,
    VadidateProductsComponent,
    ConfidentialityComponent,
    SettingsComponent,
    AdvertisingComponent,
    ProvidersComponent,
    AdminSiteComponent,
    UserProfileComponent,
    CouponComponent,
    HandleCommandComponent,
    ImagePipe,
    MultiImgPipe,
    MessageComponent,
    BlogComponent,
    SpinnerComponent,
    RejectsComponent,
    OwnCommandComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HighchartsChartModule,
    AngularEditorModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgSelectModule,
  ],
  providers: [
  ]
})
export class LayoutModule { }
