export interface CurrencyListModel {
  [key: string]: string;
}

export interface CurrentExchangeRateResponseModel {
  exchangeRate: number;
  fromSymbol: string;
  lastUpdatedAt: string;
  rateLimitExceeded?: boolean;
  success: boolean;
  toSymbol: string;
}

export interface DailyExchangeRateResponseModel {
  data: DataDailyExchangeRateResponseModel[],
  from: string,
  lastUpdatedAt: string,
  rateLimitExceeded?: boolean,
  success: boolean,
  to: string
}

export interface DataDailyExchangeRateResponseModel {
  close: number,
  date: string,
  high: number,
  low: number,
  open: number
}

export interface ExchangeRateModel {
  currentValue: number;
  lastUpdatedAt: string;
  dailyValues: DailyExchangeRateModel[];
}

export interface DailyExchangeRateModel extends DataDailyExchangeRateResponseModel {
  closeDiff: number;
}
