import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { CurrencyListModel } from '../../../core/models/currency.model';


@Component({
  selector: 'app-select-input',
  imports: [ReactiveFormsModule],
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.scss'
})
export class SelectInputComponent {
  @Input() label: string;
  @Input() items: CurrencyListModel[];
  @Input() control: FormControl;

  objectKeys = Object.keys;

}
