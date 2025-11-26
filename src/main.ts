import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { importProvidersFrom, providePlatformInitializer } from '@angular/core';
import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { AuthInterceptor } from './app/interceptor/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideRouter(routes),
    providePlatformInitializer(platformBrowserDynamic),
    provideSocialAuthServiceConfig(),
    importProvidersFrom([BrowserModule, BrowserAnimationsModule]),
  ],
}).catch((err) => console.error(err));
function provideSocialAuthServiceConfig(): import("@angular/core").Provider | import("@angular/core").EnvironmentProviders {
  return {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('689417821185-ka24l7632cgg59rvva0ej2n2cnel2ckp.apps.googleusercontent.com')
        }
      ]
    } as SocialAuthServiceConfig
  };
}
  