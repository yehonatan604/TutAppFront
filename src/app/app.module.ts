import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RoutingModule } from './core/modules/routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { DialogBoxService } from './core/services/dialog-box.service';
import { BannerComponent } from './front/components/banner/banner.component';
import { FooterComponent } from './front/components/footer/footer.component';
import { HeaderComponent } from './front/components/header/header.component';
import { MainComponent } from './front/components/main/main.component';
import { NavbarComponent } from './front/components/navbar/navbar.component';
import { MainModule } from './core/modules/main.module';
import { MessageComponent } from './front/components/shared-components/messages-shared-components/message/message.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    BannerComponent,
    MessageComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RoutingModule.forRoot,
    FormsModule,
    MainModule,
  ],
  providers: [DialogBoxService, {provide: HTTP_INTERCEPTORS,useClass: JwtInterceptor ,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
