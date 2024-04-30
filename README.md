# ReactNativeMSAL - MSAL in React Native

## Overview
ReactNativeMSAL is a React Native application that demonstrates how to integrate Microsoft Authentication Library (MSAL) for authentication in a React Native environment.

## Getting Started
1. Clone this repository.
2. Navigate to the project directory.
3. Install dependencies using npm:

    ```bash
    npm install
    ```

4. Start the development server using npm:

    ```bash
    npm start
    ```

## Configuration
To configure MSAL for your specific Azure AD app, follow these steps:

1. Navigate to the `auth` directory in the project.

2. Open `AuthConfig.ts` and update the `TENANT_ID` and `CLIENT_ID` constants with your Azure AD tenant ID and client ID respectively.

3. Open `AuthManager.ts` and ensure that the `TENANT_ID` and `CLIENT_ID` constants are imported from `AuthConfig.ts`.

    ```typescript
    // AuthManager.ts
    import { TENANT_ID, CLIENT_ID } from './AuthConfig';
    ```

4. Save the changes.

## Usage
1. Start the development server using npm:

    ```bash
    npm start
    ```

2. Launch the app in your preferred environment (emulator or physical device).

3. Follow the authentication flow to sign in with your Azure AD credentials.

## Additional Notes
- Ensure that your Azure AD app is configured to allow the redirect URI specified in the React Native app.
- Review the MSAL documentation for React Native for advanced configurations and usage.

