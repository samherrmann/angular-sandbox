import { InjectionToken, ValueProvider, Type } from '@angular/core';

export const FOO_EXTENSIONS = new InjectionToken<FooExtensionFactory>('Foo Extension');

export type FooExtension = Promise<Type<any>>;

export type FooExtensionFactory = () => FooExtension;

export function provideFooExtension(dynamicImport: FooExtensionFactory): ValueProvider {
  return {
    provide: FOO_EXTENSIONS,
    useValue: dynamicImport,
    multi: true
  };
}
