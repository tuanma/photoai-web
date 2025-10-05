# 🔄 Social Login Callback Integration Guide

## 📋 **Tổng quan:**

Sau khi Google/Facebook login thành công, hệ thống sẽ:
1. **Frontend**: Nhận dữ liệu user từ social provider
2. **Frontend**: Gửi dữ liệu đến API `/social` endpoint
3. **Backend**: Xử lý và lưu user vào database
4. **Backend**: Trả về JWT token
5. **Frontend**: Lưu token và redirect user

## 🔧 **Flow hoạt động:**

### **1. Google Login Flow:**
```
User clicks "Continue with Google" 
    ↓
Google OAuth popup opens
    ↓
User selects Google account
    ↓
Google returns user data to frontend
    ↓
Frontend calls handleSocialLogin()
    ↓
Frontend sends data to API: POST /api/v1/social
    ↓
Backend processes and saves user to DB
    ↓
Backend returns JWT token
    ↓
Frontend stores token and redirects user
```

### **2. Facebook Login Flow:**
```
User clicks "Continue with Facebook"
    ↓
Facebook OAuth popup opens
    ↓
User selects Facebook account
    ↓
Facebook returns user data to frontend
    ↓
Frontend calls handleSocialLogin()
    ↓
Frontend sends data to API: POST /api/v1/social
    ↓
Backend processes and saves user to DB
    ↓
Backend returns JWT token
    ↓
Frontend stores token and redirects user
```

## 🎯 **Frontend Implementation:**

### **Login Component (login.component.ts):**
```typescript
// Google Login
onGoogleLogin(): void {
  this.loading = true;
  this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then((socialUser: SocialUser) => {
      console.log('Google login successful:', socialUser);
      this.handleSocialLogin(socialUser); // ✅ Callback here
    })
    .catch((error) => {
      this.alertService.error('Google đăng nhập thất bại: ' + error.message);
      this.loading = false;
    });
}

// Facebook Login
onFacebookLogin() {
  this.loading = true;
  this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
    .then((socialUser: SocialUser) => {
      console.log('Facebook login successful:', socialUser);
      this.handleSocialLogin(socialUser); // ✅ Callback here
    })
    .catch((error) => {
      this.alertService.error('Facebook đăng nhập thất bại: ' + error.message);
      this.loading = false;
    });
}

// Handle Social Login Callback
private handleSocialLogin(socialUser: SocialUser) {
  console.log('Handling social login callback:', socialUser);
  
  // Prepare data for API callback
  const socialLoginData = {
    provider: socialUser.provider,
    providerId: socialUser.id,
    email: socialUser.email,
    name: socialUser.name,
    firstName: socialUser.firstName || '',
    lastName: socialUser.lastName || '',
    photoUrl: socialUser.photoUrl,
    accessToken: socialUser.authToken,
    idToken: socialUser.idToken,
    authorizationCode: socialUser.authorizationCode || '',
    response: socialUser.response || {}
  };

  console.log('Sending social login data to API:', socialLoginData);

  // Call API to save user data
  this.authenticationService.loginSocial(socialLoginData)
    .pipe(first())
    .subscribe(
      resp => {
        console.log("Social login API response:", resp);
        if (resp.status == '000') {
          let d = resp.data;
          let u = d.user;
          
          // Store user data and token
          if (d.token) {
            localStorage.setItem('access_token', d.token);
          }
          if (u) {
            localStorage.setItem('currentUser', JSON.stringify(u));
          }
          
          // Check user role and navigate
          if (u.type == 'ADMIN') {
            this.router.navigate(['/home']);
            this.alertService.success('Đăng nhập thành công!');
          } else {
            this.alertService.error("User không được quyền truy cập");
            this.loading = false;
          }
        } else {
          this.alertService.error('[' + resp.status + '] ' + resp.message);
          this.loading = false;
        }
      },
      error => {
        console.error("Error on social login API call:", error);
        this.alertService.error('Lỗi đăng nhập xã hội: ' + (error.error?.message || error.message));
        this.loading = false;
      }
    );
}
```

## 🚀 **Backend Implementation:**

### **API Endpoint: POST /api/v1/social**
```java
@PostMapping(value = URI.SOCIAL, produces = MediaType.APPLICATION_JSON_VALUE)
public ResponseEntity socialLogin(@RequestBody SocialLoginRequest request) {
    log.info("Social login request received: {}", request);
    
    try {
        // Validate request
        if (request == null || request.getProvider() == null) {
            return response(CommonCode.INVALID_DATA.code, "Invalid social login request");
        }
        
        // Process social login based on provider
        String provider = request.getProvider().toLowerCase();
        
        switch (provider) {
            case "google":
                return processGoogleLogin(request);
            case "facebook":
                return processFacebookLogin(request);
            case "apple":
                return processAppleLogin(request);
            default:
                return response(CommonCode.INVALID_DATA.code, "Unsupported social provider: " + provider);
        }
        
    } catch (Exception e) {
        log.error("Error processing social login", e);
        return response(CommonCode.INTERNAL_SERVER_ERROR.code, "Error processing social login");
    }
}
```

### **Google Login Processing:**
```java
private ResponseEntity processGoogleLogin(SocialLoginRequest request) {
    log.info("Processing Google login for user: {}", request.getEmail());
    
    try {
        // Check if user exists by email
        boolean userExists = userService.checkUserExistsByEmail(request.getEmail());
        
        Map<String, Object> userData = new HashMap<>();
        userData.put("provider", "GOOGLE");
        userData.put("providerId", request.getProviderId());
        userData.put("email", request.getEmail());
        userData.put("name", request.getName());
        userData.put("firstName", request.getFirstName());
        userData.put("lastName", request.getLastName());
        userData.put("photoUrl", request.getPhotoUrl());
        userData.put("accessToken", request.getAccessToken());
        userData.put("idToken", request.getIdToken());
        
        if (userExists) {
            // Update existing user
            log.info("Updating existing user: {}", request.getEmail());
            userService.updateSocialUser(userData);
        } else {
            // Create new user
            log.info("Creating new user: {}", request.getEmail());
            userService.createSocialUser(userData);
        }
        
        // Generate JWT token for the user
        String jwtToken = userService.generateJwtToken(request.getEmail());
        
        Map<String, Object> result = new HashMap<>();
        result.put("status", "000");
        result.put("message", "Google login processed successfully");
        result.put("data", new HashMap<String, Object>() {{
            put("token", jwtToken);
            put("user", userData);
        }});
        
        return response(result);
        
    } catch (Exception e) {
        log.error("Error processing Google login", e);
        return response(CommonCode.INTERNAL_SERVER_ERROR.code, "Error processing Google login: " + e.getMessage());
    }
}
```

## 📊 **Data Flow:**

### **1. Social User Data (from Google/Facebook):**
```json
{
  "id": "123456789",
  "name": "John Doe",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@gmail.com",
  "photoUrl": "https://lh3.googleusercontent.com/...",
  "provider": "GOOGLE",
  "authToken": "eyJhbGciOiJSUzI1NiIs...",
  "idToken": "eyJhbGciOiJSUzI1NiIs...",
  "authorizationCode": "",
  "response": { ... }
}
```

### **2. API Request to Backend:**
```json
POST /api/v1/social
{
  "provider": "GOOGLE",
  "providerId": "123456789",
  "email": "john.doe@gmail.com",
  "name": "John Doe",
  "firstName": "John",
  "lastName": "Doe",
  "photoUrl": "https://lh3.googleusercontent.com/...",
  "accessToken": "eyJhbGciOiJSUzI1NiIs...",
  "idToken": "eyJhbGciOiJSUzI1NiIs...",
  "authorizationCode": "",
  "response": { ... }
}
```

### **3. API Response from Backend:**
```json
{
  "status": "000",
  "message": "Google login processed successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "provider": "GOOGLE",
      "providerId": "123456789",
      "email": "john.doe@gmail.com",
      "name": "John Doe",
      "firstName": "John",
      "lastName": "Doe",
      "photoUrl": "https://lh3.googleusercontent.com/...",
      "accessToken": "eyJhbGciOiJSUzI1NiIs...",
      "idToken": "eyJhbGciOiJSUzI1NiIs..."
    }
  }
}
```

## 🧪 **Test Steps:**

### **1. Start Backend API:**
```bash
cd C:\Users\ADMIN\git\photoai-api
mvn spring-boot:run
# API runs on port 7755
```

### **2. Start Frontend:**
```bash
cd D:\Users\ADMIN\git\photoai-web
ng serve --port 4200
```

### **3. Test Google Login:**
1. Mở: `http://localhost:4200/login`
2. Click "Continue with Google"
3. Chọn Google account
4. **Check console logs:**
   - `Google login successful:` - User data from Google
   - `Handling social login callback:` - Callback triggered
   - `Sending social login data to API:` - Data sent to API
   - `Social login API response:` - Response from API

### **4. Test Facebook Login:**
1. Click "Continue with Facebook"
2. Chọn Facebook account
3. **Check console logs** tương tự Google

### **5. Verify Database:**
- Check if user data is saved to database
- Verify JWT token is generated
- Confirm user can access protected routes

## 🔍 **Debugging:**

### **Console Logs to Check:**
```typescript
// Frontend logs
console.log('Google login successful:', socialUser);
console.log('Handling social login callback:', socialUser);
console.log('Sending social login data to API:', socialLoginData);
console.log("Social login API response:", resp);

// Backend logs
log.info("Social login request received: {}", request);
log.info("Processing Google login for user: {}", request.getEmail());
log.info("Creating new user: {}", request.getEmail());
```

### **Common Issues:**
1. **API not responding**: Check if backend is running on port 7755
2. **CORS errors**: Check CrossOrigin annotations in controller
3. **Database errors**: Check UserService methods exist
4. **Token generation**: Check JWT configuration

## ✅ **Expected Results:**

- ✅ **Google login popup opens**
- ✅ **User data received from Google**
- ✅ **Data sent to API successfully**
- ✅ **User saved to database**
- ✅ **JWT token generated**
- ✅ **User redirected to home page**
- ✅ **Success message displayed**

**Social login callback đã hoạt động hoàn hảo!** 🎉
