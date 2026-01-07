declare const google: any;

import { Injectable } from '@angular/core';
import { PromptMomentNotification } from '../models/promptMomentNotification';
import { CredentialResponse } from '../models/credentialResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private clientId = '689417821185-ka24l7632cgg59rvva0ej2n2cnel2ckp.apps.googleusercontent.com';
  private idToken: string | null = null;
  

  constructor() {
    this.initGoogleSignIn();
  }

  initGoogleSignIn() {
    google.accounts.id.initialize({
      client_id: this.clientId,
      callback: this.handleCredentialResponse.bind(this),
      auto_select: true
    });

    // Prompt for silent renew
    google.accounts.id.prompt((notification: PromptMomentNotification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        console.warn('Silent renew skipped or failed');
      }
    });
  }

  handleCredentialResponse(response: CredentialResponse) {
    this.idToken = response.credential;
    // Send to backend or store in memory
    console.log('ID Token:', this.idToken);
  }

  getToken(): string | null {
    return this.idToken;
  }
}
