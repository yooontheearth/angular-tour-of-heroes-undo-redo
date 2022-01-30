import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { create } from "rxjs-spy";

if (environment.production) {
  enableProdMode();
}
else{
  const spy = create();
  spy.show();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
