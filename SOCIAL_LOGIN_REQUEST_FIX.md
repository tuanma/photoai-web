# 🔧 Fix SocialLoginRequest Missing Methods

## ❌ **Lỗi ban đầu:**

```
The method getFirstName() is undefined for the type SocialLoginRequest
The method getLastName() is undefined for the type SocialLoginRequest
The method getAuthorizationCode() is undefined for the type SocialLoginRequest
```

## 🔍 **Nguyên nhân:**

`SocialLoginRequest` class thiếu các field và method:
- `firstName` field và `getFirstName()` method
- `lastName` field và `getLastName()` method  
- `authorizationCode` field và `getAuthorizationCode()` method

## ✅ **Giải pháp đã áp dụng:**

### **1. Thêm các field mới:**
```java
@ApiModelProperty(value = "User first name", required = false, example = "John")
private String firstName;

@ApiModelProperty(value = "User last name", required = false, example = "Doe")
private String lastName;

@ApiModelProperty(value = "Authorization code from provider", required = false)
private String authorizationCode;
```

### **2. Thêm các getter/setter methods:**
```java
public String getFirstName() {
    return firstName;
}

public void setFirstName(String firstName) {
    this.firstName = firstName;
}

public String getLastName() {
    return lastName;
}

public void setLastName(String lastName) {
    this.lastName = lastName;
}

public String getAuthorizationCode() {
    return authorizationCode;
}

public void setAuthorizationCode(String authorizationCode) {
    this.authorizationCode = authorizationCode;
}
```

### **3. Cập nhật toString method:**
```java
@Override
public String toString() {
    return "SocialLoginRequest{" +
            "provider='" + provider + '\'' +
            ", providerId='" + providerId + '\'' +
            ", email='" + email + '\'' +
            ", name='" + name + '\'' +
            ", firstName='" + firstName + '\'' +
            ", lastName='" + lastName + '\'' +
            ", photoUrl='" + photoUrl + '\'' +
            ", accessToken='" + accessToken + '\'' +
            ", idToken='" + idToken + '\'' +
            ", authorizationCode='" + authorizationCode + '\'' +
            ", deviceId='" + deviceId + '\'' +
            '}';
}
```

## 📊 **Complete SocialLoginRequest Structure:**

### **Fields:**
```java
private String provider;           // "GOOGLE", "FACEBOOK", "APPLE"
private String providerId;         // Social provider user ID
private String email;              // User email
private String name;               // Full name
private String firstName;          // First name ✅ NEW
private String lastName;           // Last name ✅ NEW
private String photoUrl;           // Profile photo URL
private String accessToken;        // Access token from provider
private String idToken;            // ID token from provider
private String authorizationCode;  // Authorization code ✅ NEW
private String deviceId;           // Device ID
```

### **Methods:**
```java
// Getters
public String getProvider()
public String getProviderId()
public String getEmail()
public String getName()
public String getFirstName()        // ✅ NEW
public String getLastName()          // ✅ NEW
public String getPhotoUrl()
public String getAccessToken()
public String getIdToken()
public String getAuthorizationCode() // ✅ NEW
public String getDeviceId()

// Setters
public void setProvider(String provider)
public void setProviderId(String providerId)
public void setEmail(String email)
public void setName(String name)
public void setFirstName(String firstName)        // ✅ NEW
public void setLastName(String lastName)          // ✅ NEW
public void setPhotoUrl(String photoUrl)
public void setAccessToken(String accessToken)
public void setIdToken(String idToken)
public void setAuthorizationCode(String authorizationCode) // ✅ NEW
public void setDeviceId(String deviceId)
```

## 🚀 **Test Steps:**

### **1. Compile Backend:**
```bash
cd C:\Users\ADMIN\git\photoai-api
mvn compile
```

### **2. Check for compilation errors:**
- Should see no errors related to `getFirstName()`, `getLastName()`, `getAuthorizationCode()`

### **3. Start Backend:**
```bash
mvn spring-boot:run
```

### **4. Test Social Login:**
1. Start frontend: `ng serve --port 4200`
2. Open: `http://localhost:4200/login`
3. Click "Continue with Google"
4. **Check backend logs:**
   - `Processing Google login for user: user@gmail.com`
   - `Google login successful for user: user@gmail.com`

## 📝 **API Request Example:**

### **Frontend sends:**
```json
POST /api/v1/social
{
  "provider": "GOOGLE",
  "providerId": "123456789",
  "email": "user@gmail.com",
  "name": "John Doe",
  "firstName": "John",           // ✅ Now supported
  "lastName": "Doe",             // ✅ Now supported
  "photoUrl": "https://...",
  "accessToken": "eyJhbGciOiJSUzI1NiIs...",
  "idToken": "eyJhbGciOiJSUzI1NiIs...",
  "authorizationCode": "4/0AX4XfWh...", // ✅ Now supported
  "deviceId": "device123"
}
```

### **Backend processes:**
```java
// Now these methods work without errors:
String firstName = request.getFirstName();        // ✅ Works
String lastName = request.getLastName();          // ✅ Works
String authCode = request.getAuthorizationCode(); // ✅ Works

Map<String, Object> userData = new HashMap<>();
userData.put("firstName", request.getFirstName());
userData.put("lastName", request.getLastName());
userData.put("authorizationCode", request.getAuthorizationCode());
```

## 🎯 **Expected Results:**

- ✅ **No compilation errors** - All methods defined
- ✅ **Social login works** - Google/Facebook login successful
- ✅ **Data mapping works** - All fields properly mapped
- ✅ **API responds** - Backend processes request successfully

## 🔧 **Future Improvements:**

### **1. Add validation:**
```java
@Size(max = 100, message = "First name must not exceed 100 characters")
private String firstName;

@Size(max = 100, message = "Last name must not exceed 100 characters")
private String lastName;
```

### **2. Add custom constructors:**
```java
public SocialLoginRequest(String provider, String providerId, String email, 
                         String name, String firstName, String lastName) {
    this.provider = provider;
    this.providerId = providerId;
    this.email = email;
    this.name = name;
    this.firstName = firstName;
    this.lastName = lastName;
}
```

**SocialLoginRequest đã được fix và hoạt động!** 🎉
