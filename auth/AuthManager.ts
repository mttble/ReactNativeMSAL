// Copyright (c) Microsoft.
// Licensed under the MIT license.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { authorize, refresh, AuthConfiguration } from 'react-native-app-auth';
import { compareAsc, parseISO, sub } from 'date-fns';

import { AuthConfig } from './AuthConfig';

const config: AuthConfiguration = {
  clientId: AuthConfig.appId,
  redirectUrl: 'graph-sample://react-native-auth/',
  scopes: AuthConfig.appScopes,
  additionalParameters: { prompt: 'select_account' },
  serviceConfiguration: {
    // replace TENANT_ID with your actual tenant ID
    authorizationEndpoint: 'https://login.microsoftonline.com/TENANT_ID/oauth2/v2.0/authorize',
    tokenEndpoint: 'https://login.microsoftonline.com/TENANT_ID/oauth2/v2.0/token',
  },
};

export class AuthManager {
  static signInAsync = async () => {
    try {
      const result = await authorize(config);
      // console.log(result.accessToken);
      
      // Store the access token, refresh token, and expiration time in storage
      await AsyncStorage.setItem('userToken', result.accessToken);
      await AsyncStorage.setItem('refreshToken', result.refreshToken);
      await AsyncStorage.setItem('expireTime', result.accessTokenExpirationDate);

      return result.accessToken; // Return the token for immediate use if needed
    } catch (error) {
      console.error('Failed to sign in',error);
    }
  };

  static signOutAsync = async () => {
    // Clear storage
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('expireTime');
  };

  static getAccessTokenAsync = async () => {
    const expireTime = await AsyncStorage.getItem('expireTime');
    if (expireTime !== null) {
      const expire = sub(parseISO(expireTime), { minutes: 5 });
      const now = new Date();
      if (compareAsc(now, expire) >= 0) {
        console.log('Refreshing token');
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        const result = await refresh(config, {
          refreshToken: refreshToken || '',
        });

        await AsyncStorage.setItem('userToken', result.accessToken);
        await AsyncStorage.setItem('refreshToken', result.refreshToken || '');
        await AsyncStorage.setItem('expireTime', result.accessTokenExpirationDate);

        return result.accessToken;
      }

      const accessToken = await AsyncStorage.getItem('userToken');
      return accessToken;
    }
    return null;
  };
}
