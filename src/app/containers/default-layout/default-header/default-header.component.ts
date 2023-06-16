import { Component, HostListener, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { User } from 'src/app/models/Private/User';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(
      private classToggler: ClassToggleService,
      private _router : Router,
    ) {
    super();
  }

  Logout(): void {
    localStorage.clear();
    window.location.reload();
    this._router.navigate(['Login']);
  }



}
