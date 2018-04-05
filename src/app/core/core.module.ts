import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

/* our own custom services  */
import { 
  CoinsService,
  HttpService,
  RouterService,
  AuthService,
  FirestoreService,
  UserService
} from './services';

import {
  AuthGuard
} from './guards';

@NgModule({
  imports: [],
  exports: [
  ],
  declarations: [
  ],
  providers: [
    CoinsService,
    HttpService,
    RouterService,
    AuthService,
    FirestoreService,
    UserService,
    AuthGuard
  ]
})
export class CoreModule {
  /* make sure CoreModule is imported only by one NgModule the AppModule */
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {
    console.log('Here we are loaded correctly');
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
