import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactRoutingModule } from './contact.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared';
import { ContactComponent } from './components/contact/contact.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  MatStep,
  MatStepContent,
  MatStepLabel,
  MatStepper,
  MatStepperNext,
  MatStepperPrevious,
} from '@angular/material/stepper';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';



@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    FaIconComponent,
    MatStepper,
    MatStep,
    MatStepperPrevious,
    MatButton,
    MatStepContent,
    MatStepperNext,
    MatStepLabel,
    MatFormField,
    MatLabel,
    MatInput,
  ],
})
export class ContactModule { }
