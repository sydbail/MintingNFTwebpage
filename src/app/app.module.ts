import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IpfsService } from './services/ipfs.service';
import { FormsModule } from '@angular/forms'
import { UploadComponent } from './upload/upload.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MintComponent } from './mint/mint.component';


@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    MintComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatExpansionModule,
    BrowserAnimationsModule
  ],
  providers: [IpfsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
