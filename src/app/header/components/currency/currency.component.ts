import { Component, Input, OnInit } from '@angular/core';
import { AcceptableCurrency } from 'src/app/shared/enums/acceptable-currecy';
import { ApikeyService } from 'src/app/shared/services/apikey.service';
import { CurrencyService } from 'src/app/shared/services/currency.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {

  @Input() currency: 'EUR' | 'USD' | 'GBP';
  loading = false;
  currencyRate: number;

  constructor(private currencyService: CurrencyService,
    private apiKeyService: ApikeyService) { }

  ngOnInit(): void {
    this.loading = true;
    this.currencyService.getCurrency(this.apiKeyService.apikey, 'UAH', this.currency, 1)
      .subscribe(res => {
        this.loading = false;
        this.currencyRate = res.info.rate;
      })
  }

}
