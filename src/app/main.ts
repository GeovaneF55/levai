import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

import firebase from 'firebase';
import credentials from './credentials';

firebase.initializeApp(credentials);

platformBrowserDynamic().bootstrapModule(AppModule);
