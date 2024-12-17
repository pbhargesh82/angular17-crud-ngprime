import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DBConfig, provideIndexedDb } from 'ngx-indexed-db';
import { databaseConfig } from '@config/db.config';

const dbConfig: DBConfig = databaseConfig;

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideClientHydration(),
    provideIndexedDb(dbConfig),
  ]
};
