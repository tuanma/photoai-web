# Social Login Setup Guide

This guide will help you configure Google, Facebook, and Apple login for your PhotoAI application.

## 1. Google OAuth Setup

### Step 1: Create Google OAuth Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set application type to "Web application"
6. Add your domain to "Authorized JavaScript origins":
   - `http://localhost:4200` (for development)
   - `https://yourdomain.com` (for production)
7. Copy the Client ID

### Step 2: Update Configuration
Update `src/app/_services/social-login.config.ts`:
```typescript
google: {
  clientId: 'YOUR_ACTUAL_GOOGLE_CLIENT_ID',
  scope: 'profile email'
}
```

## 2. Facebook Login Setup

### Step 1: Create Facebook App
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add "Facebook Login" product
4. Go to Facebook Login → Settings
5. Add Valid OAuth Redirect URIs:
   - `http://localhost:4200` (for development)
   - `https://yourdomain.com` (for production)
6. Copy the App ID

### Step 2: Update Configuration
Update `src/app/_services/social-login.config.ts`:
```typescript
facebook: {
  appId: 'YOUR_ACTUAL_FACEBOOK_APP_ID',
  version: 'v18.0',
  scope: 'email,public_profile'
}
```

## 3. Apple Sign-In Setup

### Step 1: Create Apple Developer Account
1. Go to [Apple Developer Portal](https://developer.apple.com/)
2. Create an Apple ID if you don't have one
3. Enroll in the Apple Developer Program ($99/year)

### Step 2: Configure Sign in with Apple
1. Go to "Certificates, Identifiers & Profiles"
2. Create a new App ID
3. Enable "Sign In with Apple" capability
4. Create a Service ID for web authentication
5. Configure the Service ID with your domain
6. Copy the Service ID (this is your Client ID)

### Step 3: Update Configuration
Update `src/app/_services/social-login.config.ts`:
```typescript
apple: {
  clientId: 'YOUR_ACTUAL_APPLE_SERVICE_ID',
  scope: 'name email',
  redirectURI: 'https://yourdomain.com' // Your actual domain
}
```

## 4. Backend Integration

### Update Authentication Service
The social login data will be sent to your backend in this format:
```typescript
{
  provider: 'google' | 'facebook' | 'apple',
  providerId: string,
  email: string,
  name: string,
  photoUrl?: string,
  accessToken?: string,
  idToken?: string
}
```

### Backend Endpoint
Your backend should handle the `/social` endpoint to:
1. Verify the social provider token
2. Create or find the user account
3. Generate your application's JWT token
4. Return the token and user data

## 5. Testing

### Development Testing
1. Start your Angular development server: `ng serve`
2. Navigate to the login page
3. Test each social login button
4. Check browser console for any errors

### Production Deployment
1. Update all configuration with production URLs
2. Ensure HTTPS is enabled (required for Apple Sign-In)
3. Test all social login flows in production environment

## 6. Security Considerations

1. **Token Validation**: Always validate tokens on the backend
2. **HTTPS Required**: Apple Sign-In requires HTTPS in production
3. **Domain Verification**: Ensure all domains are properly configured
4. **Token Expiry**: Handle token refresh and expiry properly

## 7. Troubleshooting

### Common Issues:
1. **CORS Errors**: Ensure your domain is added to authorized origins
2. **Invalid Client ID**: Double-check your client IDs and app IDs
3. **HTTPS Required**: Apple Sign-In won't work on HTTP in production
4. **Token Validation**: Ensure your backend properly validates social tokens

### Debug Steps:
1. Check browser console for JavaScript errors
2. Verify network requests in browser dev tools
3. Test with different browsers
4. Check social provider dashboards for error logs
