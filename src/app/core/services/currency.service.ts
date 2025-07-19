import { forkJoin, map, Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  CurrencyListModel, CurrentExchangeRateResponseModel, DailyExchangeRateResponseModel,
  ExchangeRateModel, OpenExchangeratesResponseModel,
} from '../models/currency.model';


@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  readonly ActionLabBaseURL = 'https://api-brl-exchange.actionlabs.com.br/api/1.0/open';
  readonly DefaultCurrency = 'BRL';
  readonly APIKey = 'RVZG0GHEV2KORLNA';

  readonly Endpoints = {
    CurrencyList: 'https://openexchangerates.org/api/currencies.json',
    CurrentExchangeRate: `${this.ActionLabBaseURL}/currentExchangeRate?apiKey=${this.APIKey}&from_symbol=${this.DefaultCurrency}&to_symbol={}`,
    DailyExchangeRate: `${this.ActionLabBaseURL}/dailyExchangeRate?apiKey=${this.APIKey}&from_symbol=${this.DefaultCurrency}&to_symbol={}`,
  }

  constructor(private readonly httpClient: HttpClient) {}


  getCurrencyList(): Observable<CurrencyListModel[]> {
    return this.httpClient.get<OpenExchangeratesResponseModel>(this.Endpoints.CurrencyList).pipe(
      map(response => {
        delete response[this.DefaultCurrency];
        return Object.keys(response).map<CurrencyListModel>(responseKey => ({
          code: responseKey,
          name: response[responseKey],
        }));
      }),
    );
  }

  getExchangeRate(currency: string): Observable<ExchangeRateModel> {
    return forkJoin([this.getCurrentExchangeRate(currency), this.getDailyExchangeRate(currency)]).pipe(
      map<[CurrentExchangeRateResponseModel, DailyExchangeRateResponseModel], ExchangeRateModel>(response => {
        return {
          currentValue: 1 / response[0].exchangeRate,
          lastUpdatedAt: response[0].lastUpdatedAt,
          dailyValues: response[1].data.map((data, index) => ({
            close: 1 / data.close,
            date: data.date,
            high: 1 / data.high,
            low: 1 / data.high,
            open: 1 / data.open,
            closeDiff: (!index ? response[0].exchangeRate : response[1].data[index - 1].close) - data.close
          }))
        }
      }),
    )
  }

  private getCurrentExchangeRate(currency: string): Observable<CurrentExchangeRateResponseModel> {
    return this.httpClient.get<CurrentExchangeRateResponseModel>(this.Endpoints.CurrentExchangeRate.replace('{}', currency));
    return of<CurrentExchangeRateResponseModel>({
      success: true,
      lastUpdatedAt: '2025-07-17T03:00:00.000+00:00',
      fromSymbol: 'BRL',
      toSymbol: 'EUR',
      exchangeRate: 0.15555,
    });
  }

  private getDailyExchangeRate(currency: string): Observable<DailyExchangeRateResponseModel> {
    return this.httpClient.get<DailyExchangeRateResponseModel>(this.Endpoints.DailyExchangeRate.replace('{}', currency));
    return of<DailyExchangeRateResponseModel>({
      "success": true,
      "from": "BRL",
      "to": "EUR",
      "lastUpdatedAt": "2025-07-17T03:00:00.000+00:00",
      "data": [
        {
          "open": 0.15426,
          "high": 0.15628,
          "low": 0.15308,
          "close": 0.15555,
          "date": "2025-07-17T03:00:00.000+00:00"
        },
        {
          "open": 0.15513,
          "high": 0.15609,
          "low": 0.15247,
          "close": 0.15434,
          "date": "2025-07-16T03:00:00.000+00:00"
        },
        {
          "open": 0.15333,
          "high": 0.15586,
          "low": 0.15258,
          "close": 0.1551,
          "date": "2025-07-15T03:00:00.000+00:00"
        },
        {
          "open": 0.15428,
          "high": 0.15484,
          "low": 0.15283,
          "close": 0.15338,
          "date": "2025-07-14T03:00:00.000+00:00"
        },
        {
          "open": 0.15449,
          "high": 0.15503,
          "low": 0.15264,
          "close": 0.15389,
          "date": "2025-07-11T03:00:00.000+00:00"
        },
        {
          "open": 0.15304,
          "high": 0.15522,
          "low": 0.15122,
          "close": 0.1545,
          "date": "2025-07-10T03:00:00.000+00:00"
        },
        {
          "open": 0.15656,
          "high": 0.1571,
          "low": 0.15209,
          "close": 0.153,
          "date": "2025-07-09T03:00:00.000+00:00"
        },
        {
          "open": 0.15562,
          "high": 0.15748,
          "low": 0.15476,
          "close": 0.15657,
          "date": "2025-07-08T03:00:00.000+00:00"
        },
        {
          "open": 0.15651,
          "high": 0.15784,
          "low": 0.15451,
          "close": 0.15563,
          "date": "2025-07-07T03:00:00.000+00:00"
        },
        {
          "open": 0.15724,
          "high": 0.15751,
          "low": 0.15633,
          "close": 0.1566,
          "date": "2025-07-04T03:00:00.000+00:00"
        },
        {
          "open": 0.15626,
          "high": 0.15795,
          "low": 0.15544,
          "close": 0.15726,
          "date": "2025-07-03T03:00:00.000+00:00"
        },
        {
          "open": 0.15517,
          "high": 0.15721,
          "low": 0.154,
          "close": 0.15626,
          "date": "2025-07-02T03:00:00.000+00:00"
        },
        {
          "open": 0.15618,
          "high": 0.15693,
          "low": 0.15454,
          "close": 0.15517,
          "date": "2025-07-01T03:00:00.000+00:00"
        },
        {
          "open": 0.15549,
          "high": 0.15751,
          "low": 0.15404,
          "close": 0.15615,
          "date": "2025-06-30T03:00:00.000+00:00"
        },
        {
          "open": 0.15579,
          "high": 0.15684,
          "low": 0.15454,
          "close": 0.15556,
          "date": "2025-06-27T03:00:00.000+00:00"
        },
        {
          "open": 0.15415,
          "high": 0.15635,
          "low": 0.15302,
          "close": 0.15571,
          "date": "2025-06-26T03:00:00.000+00:00"
        },
        {
          "open": 0.1563,
          "high": 0.15668,
          "low": 0.1538,
          "close": 0.15416,
          "date": "2025-06-25T03:00:00.000+00:00"
        },
        {
          "open": 0.15715,
          "high": 0.1578,
          "low": 0.15551,
          "close": 0.1563,
          "date": "2025-06-24T03:00:00.000+00:00"
        },
        {
          "open": 0.15798,
          "high": 0.15893,
          "low": 0.15575,
          "close": 0.15716,
          "date": "2025-06-23T03:00:00.000+00:00"
        },
        {
          "open": 0.15842,
          "high": 0.15916,
          "low": 0.15673,
          "close": 0.15742,
          "date": "2025-06-20T03:00:00.000+00:00"
        },
        {
          "open": 0.15859,
          "high": 0.15923,
          "low": 0.15828,
          "close": 0.15842,
          "date": "2025-06-19T03:00:00.000+00:00"
        },
        {
          "open": 0.15837,
          "high": 0.15936,
          "low": 0.15736,
          "close": 0.15861,
          "date": "2025-06-18T03:00:00.000+00:00"
        },
        {
          "open": 0.15742,
          "high": 0.15947,
          "low": 0.15683,
          "close": 0.15837,
          "date": "2025-06-17T03:00:00.000+00:00"
        },
        {
          "open": 0.15644,
          "high": 0.15822,
          "low": 0.15531,
          "close": 0.15749,
          "date": "2025-06-16T03:00:00.000+00:00"
        },
        {
          "open": 0.15591,
          "high": 0.15738,
          "low": 0.15392,
          "close": 0.15615,
          "date": "2025-06-13T03:00:00.000+00:00"
        },
        {
          "open": 0.15715,
          "high": 0.15762,
          "low": 0.15464,
          "close": 0.15586,
          "date": "2025-06-12T03:00:00.000+00:00"
        },
        {
          "open": 0.15698,
          "high": 0.15879,
          "low": 0.15583,
          "close": 0.15724,
          "date": "2025-06-11T03:00:00.000+00:00"
        },
        {
          "open": 0.15751,
          "high": 0.15876,
          "low": 0.15662,
          "close": 0.157,
          "date": "2025-06-10T03:00:00.000+00:00"
        },
        {
          "open": 0.1576,
          "high": 0.15825,
          "low": 0.15613,
          "close": 0.15749,
          "date": "2025-06-09T03:00:00.000+00:00"
        },
        {
          "open": 0.15634,
          "high": 0.15824,
          "low": 0.15536,
          "close": 0.15786,
          "date": "2025-06-06T03:00:00.000+00:00"
        }
      ]
    });
  }
}
