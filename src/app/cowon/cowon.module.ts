import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CowonPageRoutingModule } from './cowon-routing.module';

import { CowonPage } from './cowon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CowonPageRoutingModule
  ],
  declarations: [CowonPage]
})
export class CowonPageModule {}
