import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { SelectInputComponent } from '../../shared/components/select-input/select-input.component';
import { AccordionDirective } from '../../shared/directives/accordion.directive';
import { HomeRoutingModule } from './home-routing-module';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,

    AccordionDirective,

    LoadingComponent,
    SelectInputComponent,
  ]
})
export class HomeModule { }
