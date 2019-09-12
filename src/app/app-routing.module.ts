import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './ui/home/home.component';

import { AboutComponent } from './ui/about/about.component';
import { ValueComponent } from './ui/about/value/value.component';
import { HistoryComponent } from './ui/about/history/history.component';
import { CIComponent } from './ui/about/ci/ci.component';
import { IRComponent } from './ui/about/ir/ir.component';
import { ProductsComponent } from './ui/products/products.component';

import { BarotokComponent } from './ui/products/barotok/barotok.component';
import { FilterComponent } from './ui/products/barotok/filter/filter.component';
import { FilterSmallComponent } from './ui/products/barotok/filter-small/filter-small.component';
import { FComponent } from './ui/products/barotok/f/f.component';
import { FSmallComponent } from './ui/products/barotok/f-small/f-small.component';
import { CoverComponent } from './ui/products/barotok/cover/cover.component';
import { SmileComponent } from './ui/products/barotok/smile/smile.component';
import { HoleComponent } from './ui/products/barotok/hole/hole.component';
import { DispenserComponent } from './ui/products/barotok/dispenser/dispenser.component';
import { DispenserSmallComponent } from './ui/products/barotok/dispenser-small/dispenser-small.component';
import { MakingComponent } from './ui/products/making/making.component';
import { WhereComponent } from './ui/products/where/where.component';
import { OnComponent } from './ui/products/where/on/on.component';
import { OffComponent } from './ui/products/where/off/off.component';
import { ReviewsComponent } from './ui/support/reviews/reviews.component';
import { FaqComponent } from './ui/support/faq/faq.component';
import { EventComponent } from './ui/support/event/event.component';
import { EventDetailComponent } from './ui/support/event/event-detail/event-detail.component';
import { NewsComponent } from './ui/about/news/news.component';
import { VideosComponent } from './ui/about/videos/videos.component';
import { ReviewWriteComponent } from './ui/support/reviews/review-write/review-write.component';
import { SignupComponent } from './ui/auth/signup/signup.component';
import { LoginComponent } from './ui/auth/login/login.component';
import { MyProfileComponent } from './ui/auth/my-profile/my-profile.component';
import { ForgotPasswordComponent } from './ui/auth/forgot-password/forgot-password.component';
import { AdminComponent } from './ui/admin/admin.component';
import { GraphComponent } from './ui/admin/graph/graph.component';
import { PointComponent } from './ui/admin/management/point/point.component';
import { TebahMallComponent } from './ui/tebah-mall/tebah-mall.component';
import { SalesChannelsComponent } from './ui/admin/management/sales-channels/sales-channels.component';
import { UserMngComponent } from './ui/admin/management/user-mng/user-mng.component';
import { SigleProductComponent } from './ui/admin/management/sigle-product/sigle-product.component';
import { PackageProductComponent } from './ui/admin/management/package-product/package-product.component';
import { EventMngComponent } from './ui/admin/management/event-mng/event-mng.component';
import { OrderComponent } from './ui/order/order.component';
import { UserOrderHistoryComponent } from './ui/order/user-order-history/user-order-history.component';
import { OrderMngComponent } from './ui/admin/management/order-mng/order-mng.component';
import { TermsComponent } from './ui/support/terms/terms.component';
import { OnlineOrderInsertComponent } from './ui/admin/management/order-mng/online-order-insert/online-order-insert.component';
import { PointMallComponent } from './ui/tebah-mall/point-mall/point-mall.component';
import { SelectOrderComponent } from './ui/admin/management/order-mng/select-order/select-order.component';



const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: 'value', component: ValueComponent},
  { path: 'history', component: HistoryComponent},
  { path: 'CI', component: CIComponent},
  { path: 'IR', component: IRComponent},
  { path: 'products', component: ProductsComponent},
  { path: 'making', component: MakingComponent},
  { path: 'barotok',
    children: [
      { path: '', component: BarotokComponent},
      { path: 'filter', component: FilterComponent},
      { path: 'filter-s', component: FilterSmallComponent},
      { path: 'F', component: FComponent},
      { path: 'F-s', component: FSmallComponent},
      { path: 'cover', component: CoverComponent},
      { path: 'smile', component: SmileComponent},
      { path: 'hole', component: HoleComponent},
      { path: 'dispenser', component: DispenserComponent},
      { path: 'dispenser-s', component: DispenserSmallComponent},
    ]
  },
  { path: 'where',
    children: [
      { path: '', component: WhereComponent},
      { path: 'on', component: OnComponent},
      { path: 'off', component: OffComponent},
    ]
  },
  { path: 'reviews', component: ReviewsComponent},
  { path: 'review',
    children: [
      { path: 'write', component: ReviewWriteComponent},
      { path: '', redirectTo:'/reviews', pathMatch: 'prefix'},
    ]
  },
  { path: 'faq', component: FaqComponent},
  { path: 'event', component: EventComponent},
  { path: 'event/:id', component: EventDetailComponent},
  { path: 'news', component: NewsComponent},
  { path: 'videos', component: VideosComponent},
  { path: 'terms', component: TermsComponent},

  { path: 'signUp', component: SignupComponent},
  { path: 'login', component: LoginComponent},
  { path: 'password', component: ForgotPasswordComponent},
  { path: 'my', component: MyProfileComponent},

  { path: 'mall',
    children: [
      { path: '', component: TebahMallComponent },
      { path: 'point', component: PointMallComponent},
    ]
  },
  { path: 'order', component: OrderComponent},
  { path: 'order-history', component: UserOrderHistoryComponent},
  
  
  { path: 'admin',
    children: [
      { path: '', component: AdminComponent },
      { path: 'management-user', component: UserMngComponent},
      { path: 'management-event', component: EventMngComponent},
      { path: 'management-SingleProduct', component: SigleProductComponent},
      { path: 'management-PackageProduct', component: PackageProductComponent},
      { path: 'management-Order', component: OrderMngComponent},
      { path: 'management-Order-select', component: SelectOrderComponent},
      { path: 'management-SalesChannels', component: SalesChannelsComponent},
      { path: 'management-point', component: PointComponent},
      { path: 'graph', component: GraphComponent},
      { path: 'OnlineOrderInsert', component: OnlineOrderInsertComponent},
    ]},
  




  { path: '**', component: HomeComponent},
  //{ path: '**', redirectTo:'/', pathMatch: 'prefix'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, 
    { scrollPositionRestoration: 'enabled' }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  SelectOrderComponent,
  PointMallComponent,
  OnlineOrderInsertComponent,
  TermsComponent,
  OrderMngComponent,
  UserOrderHistoryComponent,
  OrderComponent,
  EventMngComponent,
  SigleProductComponent,
  PackageProductComponent,
  UserMngComponent,
  SalesChannelsComponent,
  TebahMallComponent,
  PointComponent,
  GraphComponent,
  HomeComponent,
  AboutComponent,
  ValueComponent,
  HistoryComponent,
  CIComponent,
  IRComponent,
  ProductsComponent,
  BarotokComponent,
  FilterComponent,
  FilterSmallComponent,
  FComponent,
  FSmallComponent,
  CoverComponent,
  SmileComponent,
  HoleComponent,
  DispenserComponent,
  DispenserSmallComponent,
  MakingComponent,
  WhereComponent,
  OnComponent,
  OffComponent,
  ReviewsComponent,
  FaqComponent,
  EventComponent,
  EventDetailComponent,
  NewsComponent,
  VideosComponent,
  ReviewWriteComponent,
  SignupComponent,
  LoginComponent,
  MyProfileComponent,
  ForgotPasswordComponent,
  AdminComponent,
];
