import { InjectionToken } from '@angular/core';

export const FOO = new InjectionToken('Foo', {
    factory: () => {}
});
