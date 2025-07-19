import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { CurrencyListModel, ExchangeRateModel } from '../../core/models/currency.model';
import { CurrencyService } from '../../core/services/currency.service';
import { doOnSubscribe } from '../../core/utils/rxjs-operators.utils';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: false,
})
export class HomeComponent implements OnInit {
  loadingExchangeRate: boolean = false;
  exchangeRate: ExchangeRateModel;

  loadingCurrencyList: boolean = false;
  currencyList: CurrencyListModel;

  currencySelected: FormControl = new FormControl('', [ Validators.required ]);

  isOpen: boolean = false;


  constructor(protected readonly currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getCurrencyList().pipe(
      doOnSubscribe(() => this.loadingCurrencyList = true)
    ).subscribe(_currencyList => {
      this.currencyList = _currencyList;
      this.loadingCurrencyList = false;
    });
  }

  getExchangeRate(currency: string) {
    this.currencySelected.updateValueAndValidity();

    if (this.currencySelected.valid) {
      this.currencyService.getExchangeRate(currency).pipe(
        doOnSubscribe(() => this.loadingExchangeRate = true),
      ).subscribe(response => {
        console.log(response);
        this.exchangeRate = response;
        this.loadingExchangeRate = false;
      });
    }
  }
}
