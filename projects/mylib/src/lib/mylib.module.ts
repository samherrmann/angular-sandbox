import { NgModule, APP_INITIALIZER, InjectionToken, ValueProvider, ModuleWithProviders } from '@angular/core';
import { MylibComponent } from './mylib.component';

export const CONF = new InjectionToken<Conf>('Configuration')

export interface Conf {
  a: number;
  b: string;
  c: {
    d: number;
    e: string;
    f?: any;
  }
}

const defaultConf: Conf = {
  a: 1,
  b: 'foo',
  c: {
    d: 1,
    e: 'bar',
    f: {}
  }
};

@NgModule({
  imports: [
  ],
  declarations: [MylibComponent],
  exports: [MylibComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [CONF],
      useFactory: myLibInit
    }
  ]
})
export class MylibModule {

  static forRoot(conf: Conf): ModuleWithProviders {
    return {
      ngModule: MylibModule,
      providers: [
        provideConf(conf)
      ]
    }
  }
}

export function provideConf(conf: Conf): ValueProvider {
  return {
    provide: CONF,
    multi: true,
    useValue: setValues(conf, defaultConf)
  }
}

export function setValues(conf: Conf, defaults: Conf): Conf {
  return {
   a: def(conf.a, defaults.a),
   b: def(conf.b, defaults.b),
   c: {
     d: def(conf.c && conf.c.d, defaults.c.d),
     e: def(conf.c && conf.c.e, defaults.c.e),
     f: def(conf.c && conf.c.f, defaults.c.f)
   }
  };
}

export function def<T>(value: T, defaultValue: T): T {
  return value === undefined ? defaultValue: value;
}

export function myLibInit(conf: any) {
  const fn = () => { console.log(conf) };
  return fn;
}
