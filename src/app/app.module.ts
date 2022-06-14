import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { HeaderComponent } from './components/header/header.component';
import { MatDateFormats, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

const APP_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: { day: "numeric", month: "numeric", year: "numeric" }
  },
  display: {
    dateInput: { day: "numeric", month: "short", year: "numeric" },
    monthYearLabel: { year: "numeric", month: "short" },
    dateA11yLabel: { year: "numeric", month: "long", day: "numeric" },
    monthYearA11yLabel: { year: "numeric", month: "long" }
  }
};

// Services
import { NotificationModule } from './services/notification/notification.module';

// Store
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, effects } from './store/index';

const StoreDevtools = !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : [];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase.config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    NotificationModule.forRoot(),
    StoreModule.forRoot(reducers, {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true
        }
    }),
    EffectsModule.forRoot(effects),
    StoreDevtools
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: "en-GB" },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
