import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSiteComponent } from './components/admin/admin-site/admin-site.component';
import { AdvertisingComponent } from './components/admin/advertising/advertising.component';
import { BlogComponent } from './components/admin/blog/blog.component';
import { ConfidentialityComponent } from './components/admin/confidentiality/confidentiality.component';
import { CouponComponent } from './components/admin/coupon/coupon.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { HandleCommandComponent } from './components/admin/handle-command/handle-command.component';
import { MessageComponent } from './components/admin/message/message.component';
import { ProvidersComponent } from './components/admin/providers/providers.component';
import { SettingsComponent } from './components/admin/settings/settings.component';
import { VadidateProductsComponent } from './components/admin/vadidate-products/vadidate-products.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { ResetComponent } from './components/authentication/reset/reset.component';
import { UserProfileComponent } from './components/authentication/user-profile/user-profile.component';
import { LayoutComponent } from './components/layout/layout.component';
import { BrandComponent } from './components/products/brand/brand.component';
import { AddEditCatSubComponent } from './components/products/cat-and-sub/add-edit-cat-sub/add-edit-cat-sub.component';
import { CatAndSubComponent } from './components/products/cat-and-sub/cat-and-sub.component';
import { OwnCommandComponent } from './components/products/own-command/own-command.component';
import { AddEditProductComponent } from './components/products/products/add-edit-product/add-edit-product.component';
import { ProductsComponent } from './components/products/products/products.component';
import { RejectsComponent } from './components/products/rejects/rejects.component';
import { AddEditSizColComponent } from './components/products/size-and-color/add-edit-siz-col/add-edit-siz-col.component';
import { SizeAndColorComponent } from './components/products/size-and-color/size-and-color.component';
import { RulerSellerComponent } from './components/publics/ruler-seller/ruler-seller.component';
import { AuthenticateGuard } from './guards/authenticate.guard';
import { CheckRolesGuard } from './guards/check-roles.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'reset/:token', component: ResetComponent },
  { path: 'seller-policy', component: RulerSellerComponent },
  {
    path: '', component: LayoutComponent, canActivate: [AuthenticateGuard],
    children: [
      {
        path: 'dashboard', component: DashboardComponent, canActivate: [CheckRolesGuard],
        data: { expectedRoles: ['Admin', 'Root'] }
      },
      {
        path: 'admin-site/confidentiallity', component: ConfidentialityComponent, canActivate: [CheckRolesGuard],
        data: { expectedRoles: ['Admin', 'Root'] }
      },
      {
        path: 'admin-site/setting', component: SettingsComponent, canActivate: [CheckRolesGuard],
        data: { expectedRoles: ['Admin', 'Root'] }
      },
      {
        path: 'admin-site/blog', component: BlogComponent, canActivate: [CheckRolesGuard],
        data: { expectedRoles: ['Admin', 'Root'] }
      },
      {
        path: 'admin-site/advertising', component: AdvertisingComponent, canActivate: [CheckRolesGuard],
        data: { expectedRoles: ['Admin', 'Root'] }
      },
      {
        path: 'admin-site/provider', component: ProvidersComponent, canActivate: [CheckRolesGuard],
        data: { expectedRoles: ['Admin', 'Root'] }
      },
      {
        path: 'admin-site/handle-admin-site', component: AdminSiteComponent, canActivate: [CheckRolesGuard],
        data: { expectedRoles: ['Admin', 'Root'] }
      },
      {
        path: 'product', component: ProductsComponent, canActivate: [CheckRolesGuard],
        data: { expectedRoles: ['Admin', 'Root', 'Seller'] }
      },
      {
        path: 'rejet-product', component: RejectsComponent, canActivate: [CheckRolesGuard],
        data: { expectedRoles: ['Admin', 'Root', 'Seller'] }
      },
      {
        path: 'own-command', component: OwnCommandComponent, canActivate: [CheckRolesGuard],
        data: { expectedRoles: ['Admin', 'Root', 'Seller'] }
      },
      {
        path: 'product/add-edit', component: AddEditProductComponent, canActivate: [CheckRolesGuard],
        data: { expectedRoles: ['Admin', 'Root', 'Seller'] }
      },
      {
        path: 'product/brand', component: BrandComponent, canActivate: [CheckRolesGuard],
        data: { expectedRoles: ['Admin', 'Root'] }
      },
      {
        path: 'product/add-edit-brand', component: BrandComponent, canActivate: [CheckRolesGuard],
        data: { expectedRoles: ['Admin', 'Root'] }
      },
      {
        path: 'product/category-sub-category', component: CatAndSubComponent, canActivate: [CheckRolesGuard],
        data: { expectedRoles: ['Admin', 'Root'] }
      },
      {
        path: 'product/add-edit-cat-sub', component: AddEditCatSubComponent, canActivate: [CheckRolesGuard],
        data: { expectedRoles: ['Admin', 'Root'] }
      },
      {
        path: 'product/size-color', component: SizeAndColorComponent, canActivate: [CheckRolesGuard],
        data: { expectedRoles: ['Admin', 'Root'] }
      },
      {
        path: 'product/add-edit-size-color', component: AddEditSizColComponent, canActivate: [CheckRolesGuard],
        data: { expectedRoles: ['Admin', 'Root'] }
      },
      {
        path: 'product/validation', component: VadidateProductsComponent, canActivate: [CheckRolesGuard],
        data: { expectedRoles: ['Admin', 'Root', 'Validator'] }
      },
      {
        path: 'user-profile', component: UserProfileComponent, canActivate: [CheckRolesGuard],
        data: { expectedRoles: ["Root", "admin", "Validator", "Viewer", "Seller"] }
      },
      {
        path: 'admin-site/handle-coupon', component: CouponComponent, canActivate: [CheckRolesGuard],
        data: { expectedRoles: ["Root", "admin", "Validator", "Viewer", "Seller"] }
      },
      {
        path: 'admin-site/handle-command', component: HandleCommandComponent, canActivate: [CheckRolesGuard],
        data: { expectedRoles: ["Root", "admin", "Validator", "Viewer", "Seller"] }
      },
      {
        path: 'admin-site/handle-message', component: MessageComponent, canActivate: [CheckRolesGuard],
        data: { expectedRoles: ["Root", "admin", "Validator", "Viewer", "Seller"] }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
