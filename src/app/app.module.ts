import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { SafePipe } from './pipes/safe.pipe'
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AlertModule } from 'ngx-alerts';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { ChartsModule } from 'ng2-charts';


import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule} from 'angularfire2/database';


import { MenuService } from './services/menu.service';
import { AuthService } from './services/auth.service';

import { AppComponent} from './app.component';
import { NavigationComponent } from './ui/navigation/navigation.component';
import { FooterComponent } from './ui/footer/footer.component';
import { SideMenuComponent } from './ui/products/barotok/side-menu/side-menu.component';
import { NotAdminComponent } from './ui/admin/not-admin/not-admin.component';
import { NotLoginComponent } from './ui/admin/not-login/not-login.component';
import { SidebarAdminComponent } from './ui/admin/sidebar-admin/sidebar-admin.component';
import { BottomInfoComponent } from './ui/products/barotok/bottom-info/bottom-info.component';
import { BasketAddModalComponent } from './ui/ng-modals/basket-add-modal/basket-add-modal.component';



@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    routingComponents,
    SideMenuComponent,
    SafePipe,
    DateAgoPipe,
    NotAdminComponent,
    NotLoginComponent,
    SidebarAdminComponent,
    BottomInfoComponent,
    BasketAddModalComponent,
  ],
  imports: [
    NgbModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    ChartsModule,
    AlertModule.forRoot({maxMessages: 1, timeout: 5000, position: 'right'}),
    TextareaAutosizeModule,
    AngularFireModule.initializeApp(environment.firebase, 'Tebah-web'),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  providers: [
    MenuService,
    AuthService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [ BasketAddModalComponent ],
  
})
export class AppModule { }
