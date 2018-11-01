import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

// Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EventosPage } from '../pages/eventos/eventos';
import { EventoPage } from '../pages/evento/evento';
import { ItensPage } from '../pages/itens/itens';
import { ItemPage } from '../pages/item/item';
import { ParticipantesPage } from '../pages/participantes/participantes';
import { ParticipantePage } from '../pages/participante/participante';
import { ConsultarEventoPage } from '../pages/consultar-evento/consultar-evento';
import { ParticipanteEventoPage } from '../pages/participante-evento/participante-evento';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Providers
import { EventosProvider } from '../providers/eventos/eventos';
import { ItensProvider } from '../providers/itens/itens';
import { ParticipantesProvider } from '../providers/participantes/participantes';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EventosPage,
    EventoPage,
    ItensPage,
    ItemPage,
    ParticipantesPage,
    ParticipantePage,
    ConsultarEventoPage,
    ParticipanteEventoPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EventosPage,
    EventoPage,
    ItensPage,
    ItemPage,
    ParticipantesPage,
    ParticipantePage,
    ConsultarEventoPage,
    ParticipanteEventoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EventosProvider,
    ItensProvider,
    ParticipantesProvider
  ]
})
export class AppModule {}
