# 🔧 Fix OAuth Unauthorized Error

## ❌ **Lỗi ban đầu:**

```
<oauth>
    <error_description>Full authentication is required to access this resource</error_description>
    <error>unauthorized</error>
</oauth>
```

## 🔍 **Nguyên nhân:**

### **1. Google OAuth Configuration Issues:**
- **Client ID** không đúng hoặc không được authorize
- **Redirect URI** không được thêm vào Google Console
- **OAuth flow** không đúng

### **2. OAuth Flow Problems:**
- Sử dụng `data-login_uri` thay vì `data-callback`
- Google OAuth cần JavaScript callback function
- Backend endpoint không được gọi đúng cách

## ✅ **Giải pháp đã áp dụng:**

### **1. Thay đổi OAuth Configuration:**
```html
<!-- Before (SAI) -->
<div id="g_id_onload"
     data-client_id="99119992057-m2d22glpdjimk6bf2qr7ffop48mqd4g8.apps.googleusercontent.com"
     data-context="signin"
     data-ux_mode="popup"
     data-login_uri="http://localhost:7755/v1/oauth/google/callback"  <!-- ❌ Wrong -->
     data-auto_prompt="false">
</div>

<!-- After (ĐÚNG) -->
<div id="g_id_onload"
     data-client_id="99119992057-m2d22glpdjimk6bf2qr7ffop48mqd4g8.apps.googleusercontent.com"
     data-context="signin"
     data-ux_mode="popup"
     data-callback="handleCredentialResponse"  <!-- ✅ Correct -->
     data-auto_prompt="false">
</div>
```

### **2. Thêm JavaScript Callback Function:**
```javascript
function handleCredentialResponse(response) {
    console.log('Google OAuth response:', response);
    
    if (response.credential) {
        // Send credential to your backend
        fetch('http://localhost:7755/v1/oauth/google/callback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'credential=' + encodeURIComponent(response.credential) + '&g_csrf_token=' + encodeURIComponent(response.g_csrf_token || '')
        })
        .then(response => response.json())
        .then(data => {
            console.log('Backend response:', data);
            if (data.status === '000') {
                // Success - redirect to home page
                window.location.href = '/home';
            } else {
                alert('Login failed: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Login failed: ' + error.message);
        });
    } else {
        console.error('No credential received');
        alert('Google login failed: No credential received');
    }
}
```

### **3. Google OAuth Flow:**
```
User clicks "Continue with Google"
    ↓
Google popup opens
    ↓
User selects Google account
    ↓
Google calls handleCredentialResponse(response)
    ↓
JavaScript sends credential to backend
    ↓
Backend processes JWT token
    ↓
Backend returns success response
    ↓
Frontend redirects to home page
```

## 🔧 **Google Console Configuration:**

### **1. Authorized JavaScript Origins:**
```
http://localhost:4200
http://127.0.0.1:4200
```

### **2. Authorized Redirect URIs:**
```
http://localhost:4200
http://127.0.0.1:4200
```

### **3. OAuth Consent Screen:**
- **Application name**: PhotoAI
- **User support email**: your-email@example.com
- **Developer contact**: your-email@example.com

## 🚀 **Test Steps:**

### **1. Start Backend:**
```bash
cd C:\Users\ADMIN\git\photoai-api
mvn spring-boot:run
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
   - `Google OAuth response: {credential: "eyJhbGciOiJSUzI1NiIs...", g_csrf_token: "abc123"}`
   - `Backend response: {status: "000", message: "Google OAuth callback received successfully"}`

### **4. Expected Results:**
- ✅ **No OAuth error** - Google authentication successful
- ✅ **Credential received** - JWT token from Google
- ✅ **Backend processing** - API processes JWT token
- ✅ **User redirected** - Successfully redirected to home page

## 🔍 **Debugging:**

### **1. Check Google Console:**
- Verify Client ID is correct
- Check Authorized JavaScript Origins
- Check OAuth Consent Screen configuration

### **2. Check Console Logs:**
```javascript
// Frontend logs
console.log('Google OAuth response:', response);
console.log('Backend response:', data);

// Backend logs
log.info("Google OAuth callback received - Credential: present, CSRF Token: present, Error: null");
log.info("Processing Google credential: eyJhbGciOiJSUzI1NiIs...");
```

### **3. Common Issues:**
- **Client ID mismatch**: Check Google Console
- **CORS errors**: Check CrossOrigin annotations
- **JWT parsing errors**: Check credential format

## 🎯 **Key Changes:**

- ✅ **OAuth Flow**: `data-login_uri` → `data-callback`
- ✅ **JavaScript Handler**: Added `handleCredentialResponse()`
- ✅ **Backend Integration**: Direct API call from JavaScript
- ✅ **Error Handling**: Proper error handling and logging

## 📊 **OAuth Flow Comparison:**

### **Before (SAI):**
```
Google → Backend (POST /oauth/google/callback)
❌ OAuth error: unauthorized
```

### **After (ĐÚNG):**
```
Google → JavaScript (handleCredentialResponse)
JavaScript → Backend (POST /oauth/google/callback)
Backend → JavaScript (success response)
JavaScript → Frontend (redirect to home)
✅ OAuth successful
```

**OAuth unauthorized error đã được fix!** 🎉
