# 🔧 Troubleshooting Social Login

## ❌ **Lỗi: `this.socialAuthService.signInWithGoogle is not a function`**

### **Nguyên nhân:**
- Service chưa được inject đúng cách
- Cache cũ chưa được clear
- Dev server cần restart

### **Giải pháp:**

#### **1. Restart Dev Server**
```bash
# Stop current server (Ctrl+C)
# Then restart
ng serve --port 4200
```

#### **2. Clear Cache**
```bash
# Clear Angular cache
ng build --delete-output-path
# Or clear node_modules
rm -rf node_modules
npm install
```

#### **3. Kiểm tra Service Injection**
```typescript
// login.component.ts
constructor(
  // ... other services
  private socialAuthService: SocialAuthServiceWrapper, // ✅ Đúng
) {}
```

#### **4. Kiểm tra Module Configuration**
```typescript
// app.module.ts
@NgModule({
  imports: [
    SocialLoginModule, // ✅ Phải có
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        // ... config
      }
    }
  ]
})
```

#### **5. Kiểm tra Service File**
```typescript
// social-auth.service.ts
@Injectable({
  providedIn: 'root' // ✅ Đúng
})
export class SocialAuthServiceWrapper {
  constructor(private socialAuthService: SocialAuthService) {}
  
  signInWithGoogle(): Promise<SocialUser> {
    return this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
```

## 🚀 **Test Steps**

### **1. Start Fresh**
```bash
# Stop server
# Clear cache
ng build --delete-output-path
# Start server
ng serve --port 4200
```

### **2. Check Console**
- Mở Developer Tools
- Kiểm tra Console tab
- Tìm lỗi liên quan đến social login

### **3. Check Network**
- Kiểm tra Network tab
- Xem có request nào fail không
- Kiểm tra Google/Facebook scripts load

## 🔍 **Debug Commands**

### **Check Service Injection**
```typescript
// Thêm vào constructor
console.log('SocialAuthService:', this.socialAuthService);
console.log('signInWithGoogle method:', typeof this.socialAuthService.signInWithGoogle);
```

### **Check Module Loading**
```typescript
// Thêm vào ngOnInit
console.log('SocialLoginModule loaded:', !!this.socialAuthService);
```

## ✅ **Expected Behavior**

### **Khi hoạt động đúng:**
1. Click "Continue with Google"
2. Popup Google OAuth xuất hiện
3. User chọn account
4. Popup đóng, user data trả về
5. Console log: "Google login successful: {user data}"

### **Khi có lỗi:**
1. Console error: "TypeError: this.socialAuthService.signInWithGoogle is not a function"
2. Popup không xuất hiện
3. User thấy error message

## 🎯 **Quick Fix**

Nếu vẫn lỗi, thử:

1. **Restart hoàn toàn:**
   ```bash
   # Stop server
   # Clear cache
   ng build --delete-output-path
   # Start fresh
   ng serve --port 4200
   ```

2. **Kiểm tra imports:**
   ```typescript
   // Đảm bảo import đúng
   import { SocialAuthServiceWrapper } from '../_services/social-auth.service';
   ```

3. **Kiểm tra module:**
   ```typescript
   // Đảm bảo SocialLoginModule trong imports
   imports: [SocialLoginModule]
   ```

## 📞 **Nếu vẫn lỗi**

Gửi thông tin:
- Console error message
- Network tab screenshots
- Service file content
- Module configuration
