import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  NavModule,
  ProgressModule,
  TableModule,
  TabsModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ListUsersComponent } from './list-users.component';
import { ListUsersRoutingModule } from './list-users.routing.module'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from 'src/app/security/Jwt.interceptor';
import { PagesRoutingModule } from '../pages/pages-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { AppComponent } from 'src/app/app.component';

@NgModule({
  imports: [
    ListUsersRoutingModule,
    CommonModule,
    PagesRoutingModule,
    CardModule,
    FormsModule,
    MatFormFieldModule,
    MatCardModule,
    ButtonModule,
    GridModule,
    FormModule,
    IconModule,
    FormModule
  ],
  declarations: [ListUsersComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true,
    },
  ],
  bootstrap: [AppComponent]
})
export class ListUsersModule {
}
