import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CowonPage } from './cowon.page';

const routes: Routes = [
  {
    path: '',
    component: CowonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CowonPageRoutingModule {}
