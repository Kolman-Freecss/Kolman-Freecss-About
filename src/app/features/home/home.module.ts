import { NgModule } from '@angular/core';
import { HeaderComponent } from '../../shared/components/layout/header';
import { HomeComponent } from './components';
import { HomeRoutingModule } from './home.routing';
import { SharedModule } from '../../shared';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { provideNgxWebstorage, withLocalStorage, withNgxWebstorageConfig, withSessionStorage } from 'ngx-webstorage';


@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
  ],
   imports: [
      HomeRoutingModule,
      CommonModule,
      FontAwesomeModule,
      SharedModule
   ],
    providers: [
        provideNgxWebstorage(
          withNgxWebstorageConfig({ separator: ':', caseSensitive: true }),
          withLocalStorage(),
          withSessionStorage()
	    )
    ]
})
export class HomeModule {
}
