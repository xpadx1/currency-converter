import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { BodyComponent } from "./components/body.component";
import { ConvertComponent } from "./components/convert/convert.component";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  declarations: [BodyComponent, ConvertComponent],
  exports: [BodyComponent]
})

export class BodyModule {
}