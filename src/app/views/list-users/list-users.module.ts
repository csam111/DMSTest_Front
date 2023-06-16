import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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
import { ChartjsModule } from '@coreui/angular-chartjs';
import { ListUsersComponent } from './list-users.component';
import {MatTableModule} from '@angular/material/table';
import { ListUsersRoutingModule } from './list-users.routing.module'
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    ListUsersRoutingModule,
    HttpClientModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    MatTableModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    ChartjsModule,
    AvatarModule,
    TableModule,
  ],
  declarations: [ListUsersComponent]
})
export class ListUsersModule {
}
