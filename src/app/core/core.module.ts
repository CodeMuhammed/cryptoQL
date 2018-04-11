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
  UserService,
  PromptsService,
  SearchService
} from './services';

import {
  AuthGuard, 
  NoAuthGuard
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
    PromptsService,
    AuthGuard,
    NoAuthGuard,
    SearchService
  ]
})
export class CoreModule {
  /* make sure CoreModule is imported only by one NgModule the AppModule */
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
