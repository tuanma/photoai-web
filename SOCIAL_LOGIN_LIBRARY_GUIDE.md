# Social Login với Angularx Social Login Library

## ✅ **Đã Cài Đặt**

### **Thư viện sử dụng:**
- `@abacritt/angularx-social-login` - Thư viện chính thức cho Angular social login
- Hỗ trợ Google, Facebook, Apple, LinkedIn, và nhiều provider khác

## 🔧 **Cấu Hình**

### **1. App Module Configuration**
```typescript
// app.module.ts
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';

@NgModule({
  imports: [
    SocialLoginModule,
    // ... other imports
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('YOUR_GOOGLE_CLIENT_ID')
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('YOUR_FACEBOOK_APP_ID')
          }
        ],
        onError: (err) => {
          console.error('Social login error:', err);
        }
      } as SocialAuthServiceConfig,
    }
  ]
})
```

### **2. Service Wrapper**
```typescript
// social-auth.service.ts
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Injectable()
export class SocialAuthServiceWrapper {
  constructor(private socialAuthService: SocialAuthService) {}

  signInWithGoogle(): Promise<SocialUser> {
    return this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFacebook(): Promise<SocialUser> {
    return this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
```

### **3. Component Usage**
```typescript
// login.component.ts
onGoogleLogin() {
  this.socialAuthService.signInWithGoogle()
    .then((socialUser: SocialUser) => {
      console.log('Google login successful:', socialUser);
      this.handleSocialLogin(socialUser);
    })
    .catch((error) => {
      console.error('Google login failed:', error);
    });
}
```

## 🎯 **Lợi Ích**

### **So với tự implement:**
- ✅ **Đơn giản hơn**: Không cần tự quản lý SDK loading
- ✅ **Ổn định hơn**: Thư viện đã được test kỹ lưỡng
- ✅ **Bảo trì tốt hơn**: Cập nhật tự động khi có thay đổi
- ✅ **Hỗ trợ nhiều provider**: Google, Facebook, Apple, LinkedIn, etc.
- ✅ **TypeScript support**: Đầy đủ type definitions
- ✅ **Error handling**: Xử lý lỗi tự động

### **Tính năng:**
- 🔐 **Auto login**: Có thể tự động đăng nhập lại
- 🔄 **Token refresh**: Tự động refresh token
- 📱 **Mobile support**: Hỗ trợ mobile apps
- 🌐 **Cross-platform**: Hoạt động trên web và mobile

## 🚀 **Cách Sử Dụng**

### **1. Google Login**
```typescript
// Đơn giản chỉ cần gọi method
this.socialAuthService.signInWithGoogle()
  .then(user => {
    // Xử lý user data
    console.log(user.id, user.name, user.email);
  });
```

### **2. Facebook Login**
```typescript
this.socialAuthService.signInWithFacebook()
  .then(user => {
    // Xử lý user data
    console.log(user.id, user.name, user.email);
  });
```

### **3. Check Login Status**
```typescript
// Lắng nghe thay đổi trạng thái đăng nhập
this.socialAuthService.getCurrentUser().subscribe(user => {
  if (user) {
    console.log('User is logged in:', user);
  } else {
    console.log('User is not logged in');
  }
});
```

## 🔧 **Cấu Hình Provider**

### **Google OAuth:**
1. Tạo project trên [Google Cloud Console](https://console.cloud.google.com/)
2. Enable Google+ API
3. Tạo OAuth 2.0 Client ID
4. Thêm domain vào authorized origins
5. Copy Client ID vào config

### **Facebook Login:**
1. Tạo app trên [Facebook Developers](https://developers.facebook.com/)
2. Thêm Facebook Login product
3. Cấu hình Valid OAuth Redirect URIs
4. Copy App ID vào config

## 📝 **Data Structure**

### **SocialUser Object:**
```typescript
interface SocialUser {
  id: string;           // User ID từ provider
  name: string;         // Tên đầy đủ
  email: string;        // Email
  photoUrl: string;     // URL ảnh đại diện
  provider: string;     // 'GOOGLE', 'FACEBOOK', etc.
  authToken: string;    // Access token
  idToken: string;      // ID token (Google)
  response: any;        // Raw response từ provider
}
```

## 🐛 **Troubleshooting**

### **Common Issues:**
1. **"Provider not configured"**: Kiểm tra Client ID/App ID
2. **"Popup blocked"**: Cho phép popup trong browser
3. **"CORS error"**: Kiểm tra domain configuration
4. **"Token expired"**: Thư viện tự động refresh

### **Debug:**
```typescript
// Bật debug mode
this.socialAuthService.getCurrentUser().subscribe(user => {
  console.log('Current user:', user);
});
```

## 🎉 **Kết Luận**

Sử dụng thư viện `@abacritt/angularx-social-login` là lựa chọn tốt nhất vì:
- **Đơn giản**: Chỉ cần vài dòng code
- **Ổn định**: Được maintain bởi community
- **Đầy đủ tính năng**: Hỗ trợ tất cả provider phổ biến
- **TypeScript**: Full type support
- **Documentation**: Tài liệu chi tiết

Thay vì tự implement phức tạp, hãy sử dụng thư viện này để tiết kiệm thời gian và đảm bảo chất lượng!
