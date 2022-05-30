import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { HeaderComponent } from "./components/header.component";
import { CurrencyComponent } from './components/currency/currency.component';
import { HttpClientModule } from "@angular/common/http";


@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [HeaderComponent, CurrencyComponent],
  exports: [HeaderComponent]
})

export class HeaderModule {
}