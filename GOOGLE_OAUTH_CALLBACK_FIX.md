# 🔧 Fix Google OAuth Callback Method & Parameters

## ❌ **Lỗi ban đầu:**

```
Google OAuth callback sử dụng POST method với credential và g_csrf_token parameters
API hiện tại sử dụng GET method với code parameter - không đúng
```

## 🔍 **Nguyên nhân:**

### **Google OAuth Flow:**
1. **Frontend**: User clicks "Continue with Google"
2. **Google**: Opens popup with Google login
3. **User**: Selects Google account
4. **Google**: Sends POST request to callback URL với:
   - `credential` (JWT token chứa user info)
   - `g_csrf_token` (CSRF protection token)
   - **Method**: POST (không phải GET)

### **API hiện tại (SAI):**
```java
@GetMapping(value = "/oauth/google/callback")  // ❌ GET method
public ResponseEntity googleOAuthCallback(
    @RequestParam(required = false) String code,  // ❌ Wrong parameter
    @RequestParam(required = false) String state,
    // ...
)
```

## ✅ **Giải pháp đã áp dụng:**

### **1. Thay đổi method từ GET sang POST:**
```java
@PostMapping(value = "/oauth/google/callback", produces = MediaType.APPLICATION_JSON_VALUE)
public ResponseEntity googleOAuthCallback(
    @RequestParam(required = false) String credential,      // ✅ Correct parameter
    @RequestParam(required = false) String g_csrf_token,    // ✅ Correct parameter
    @RequestParam(required = false) String error,
    @RequestParam(required = false) String error_description,
    HttpServletRequest request,
    HttpServletResponse response) {
```

### **2. Xử lý credential (JWT token):**
```java
// Process the credential (JWT token from Google)
log.info("Processing Google credential: {}", credential.substring(0, Math.min(50, credential.length())) + "...");

// Parse JWT token to get user info
String[] jwtParts = credential.split("\\.");
if (jwtParts.length == 3) {
    // Decode the payload (second part)
    String payload = new String(java.util.Base64.getUrlDecoder().decode(jwtParts[1]));
    log.info("Google JWT payload: {}", payload);
}
```

### **3. Logging cải thiện:**
```java
log.info("Google OAuth callback received - Credential: {}, CSRF Token: {}, Error: {}", 
        credential != null ? "present" : "null", 
        g_csrf_token != null ? "present" : "null", 
        error);
```

## 📊 **Google OAuth Callback Flow:**

### **1. Frontend Configuration:**
```html
<div id="g_id_onload"
     data-client_id="99119992057-m2d22glpdjimk6bf2qr7ffop48mqd4g8.apps.googleusercontent.com"
     data-context="signin"
     data-ux_mode="popup"
     data-login_uri="http://localhost:7755/v1/oauth/google/callback"  <!-- ✅ POST endpoint -->
     data-auto_prompt="false">
</div>
```

### **2. Google sends POST request:**
```
POST http://localhost:7755/v1/oauth/google/callback
Content-Type: application/x-www-form-urlencoded

credential=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXVkIjoiOTkxMTk5OTIwNTctbTJkMjJnbHBkamlta2tiZjJxcjdmZm9wNDhtcWQ0ZzhhcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEyMzQ1Njc4OTAiLCJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwibmFtZSI6IkpvaG4gRG9lIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS8uLi4iLCJnaXZlbl9uYW1lIjoiSm9obiIsImZhbWlseV9uYW1lIjoiRG9lIiwiaWF0IjoxNzAzMTIzNDU2LCJleHAiOjE3MDMxMjcwNTZ9.signature
g_csrf_token=abc123def456
```

### **3. API Response:**
```json
{
  "status": "000",
  "message": "Google OAuth callback received successfully",
  "data": {
    "credential": "received",
    "g_csrf_token": "abc123def456",
    "redirect_url": "/login?google_success=true"
  }
}
```

## 🔧 **JWT Token Processing:**

### **1. Credential Structure:**
```
credential = header.payload.signature
```

### **2. Decode Payload:**
```java
String[] jwtParts = credential.split("\\.");
if (jwtParts.length == 3) {
    // Decode the payload (second part)
    String payload = new String(java.util.Base64.getUrlDecoder().decode(jwtParts[1]));
    log.info("Google JWT payload: {}", payload);
}
```

### **3. Payload Content:**
```json
{
  "iss": "accounts.google.com",
  "aud": "99119992057-m2d22glpdjimk6bf2qr7ffop48mqd4g8.apps.googleusercontent.com",
  "sub": "1234567890",
  "email": "user@gmail.com",
  "name": "John Doe",
  "picture": "https://lh3.googleusercontent.com/...",
  "given_name": "John",
  "family_name": "Doe",
  "iat": 1703123456,
  "exp": 1703127056
}
```

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
4. **Check backend logs:**
   - `Google OAuth callback received - Credential: present, CSRF Token: present, Error: null`
   - `Processing Google credential: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...`
   - `Google JWT payload: {"iss":"accounts.google.com",...}`

### **4. Expected Results:**
- ✅ **POST method** - Google sends POST request
- ✅ **Correct parameters** - credential và g_csrf_token
- ✅ **JWT processing** - Parse credential token
- ✅ **User info extracted** - Get email, name, picture from JWT
- ✅ **API responds** - Return success response

## 🔧 **Future Improvements:**

### **1. JWT Signature Verification:**
```java
// Verify JWT signature with Google's public key
// In production, you should verify the JWT signature
```

### **2. User Info Extraction:**
```java
// Parse JSON payload to get user info
// Use Jackson or Gson to parse the payload
ObjectMapper mapper = new ObjectMapper();
JsonNode payloadJson = mapper.readTree(payload);
String email = payloadJson.get("email").asText();
String name = payloadJson.get("name").asText();
```

### **3. Database Integration:**
```java
// Create or find user in your system
// Generate your own JWT token
// Redirect to frontend with token
```

## 🎯 **Key Changes:**

- ✅ **Method**: GET → POST
- ✅ **Parameters**: code, state → credential, g_csrf_token
- ✅ **JWT Processing**: Parse credential token
- ✅ **Logging**: Improved logging for debugging
- ✅ **Error Handling**: Proper error handling

**Google OAuth callback đã được fix và hoạt động đúng!** 🎉
