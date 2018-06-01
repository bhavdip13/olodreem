import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../../default/default.component';

import { MediaService } from '../../services/media.service';

import { FormsModule } from '@angular/forms';
import { BaseRequestOptions, HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { MediaComponent } from './media.component';


const routes: Routes = [
  {
    "path": "",
    "component": DefaultComponent,
    "children": [
      {
        "path": "",
        "component": MediaComponent
      }
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule,
    HttpModule,
    FormsModule

  ], exports: [
    RouterModule
  ], declarations: [
    MediaComponent,
   
  ],
  providers: [MediaService]
})
export class MediaModule {



}
