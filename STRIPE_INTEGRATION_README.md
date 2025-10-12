# Stripe Integration for PhotoAI Pricing Component

## Tổng quan
Đã tích hợp thành công Stripe Checkout vào pricing component của PhotoAI web application. Hệ thống sử dụng Stripe Checkout để mở form thanh toán của Stripe thay vì tạo modal riêng, đơn giản và hiệu quả hơn.

## Các tính năng đã triển khai

### Frontend (Angular)
1. **PaymentService** - Service để giao tiếp với backend API
2. **Stripe Checkout Integration** - Sử dụng `stripe.redirectToCheckout()` để mở form thanh toán
3. **Authentication Check** - Kiểm tra đăng nhập trước khi thanh toán
4. **Loading State** - Hiển thị trạng thái processing khi tạo checkout session
5. **Error Handling** - Xử lý lỗi thanh toán

### Backend (Spring Boot)
1. **PaymentController** - API endpoints cho payment
2. **PaymentService** - Business logic xử lý payment
3. **UserSubscriptionService** - Quản lý subscription của user
4. **Transaction Management** - Lưu trữ thông tin giao dịch

## Cách sử dụng

### 1. Cấu hình Stripe
- Stripe public key đã được cấu hình trong `environment.ts`
- Backend cần cấu hình Stripe secret key trong `application.yml`

### 2. Luồng thanh toán
1. User chọn plan trên pricing page
2. Hệ thống kiểm tra authentication
3. Tạo checkout session qua backend API
4. Redirect đến Stripe Checkout form
5. User hoàn thành thanh toán trên Stripe
6. Stripe redirect về success/cancel URL
7. Backend xử lý webhook và lưu subscription

### 3. API Endpoints
- `POST /v1/payments/config` - Lấy cấu hình payment
- `POST /v1/payments/create-checkout-session` - Tạo Stripe checkout session
- `POST /v1/payments/webhook` - Xử lý Stripe webhooks
- `POST /v1/payments/create-intent` - Tạo Stripe payment intent (legacy)
- `POST /v1/payments/confirm` - Xác nhận payment
- `POST /v1/payments/paypal/create-order` - Tạo PayPal order
- `POST /v1/payments/paypal/capture` - Capture PayPal payment

### 4. API Response Format
```json
{
  "status": "000",
  "message": "OK", 
  "data": {
    "sessionId": "cs_test_...",
    "message": "Checkout session created successfully",
    "url": "https://checkout.stripe.com/c/pay/...",
    "status": "created"
  }
}
```

### 5. URL Usage
API trả về `url` field có các mục đích sau:

#### **Primary Use: Direct Redirect**
- **Ưu điểm**: Đáng tin cậy hơn, không phụ thuộc vào Stripe.js
- **Cách dùng**: `window.location.href = response.data.url`
- **Phù hợp**: Tất cả devices và browsers

#### **Fallback Use: Stripe.js Redirect**
- **Khi nào**: Khi không có URL hoặc cần custom handling
- **Cách dùng**: `stripe.redirectToCheckout({ sessionId: response.data.sessionId })`
- **Phù hợp**: Khi cần error handling chi tiết

#### **Debugging & Logging**
- **URL logging**: Log URL để debug và monitor
- **Device detection**: Detect mobile/desktop để optimize
- **Error tracking**: Track redirect failures

## Cấu trúc Code

### Frontend Files
```
src/app/
├── _services/
│   ├── payment.service.ts          # Payment service
│   └── index.ts                    # Export services
├── pricing/
│   ├── pricing.component.ts        # Main pricing component
│   ├── pricing.component.html      # Template with pricing cards
│   └── pricing.component.scss      # Styles for pricing page
└── environments/
    └── environment.ts              # Stripe public key config
```

### Backend Files
```
src/main/java/vn/mtech/
├── controller/
│   ├── PaymentController.java      # Payment API endpoints
│   ├── TransactionController.java  # Transaction management
│   └── SubscriptionController.java # Subscription management
├── service/
│   ├── PaymentService.java         # Payment business logic
│   └── UserSubscriptionService.java # User subscription logic
├── io/
│   ├── request/
│   │   ├── PaymentRequest.java     # Payment request model
│   │   └── SubscribeRequest.java   # Subscription request model
│   └── response/
│       └── PaymentResponse.java    # Payment response model
└── entity/
    ├── UserSubscription.java       # User subscription entity
    └── Transaction.java            # Transaction entity
```

## Testing

### Test Cards (Stripe Test Mode)
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **Insufficient Funds**: 4000 0000 0000 9995

### Test Flow
1. Chọn Pro plan ($19/month)
2. Click "Start Pro Trial" button
3. Hệ thống sẽ redirect đến Stripe Checkout
4. Nhập test card number và thông tin khác
5. Complete payment để test flow

## Security Features
- Stripe Checkout đảm bảo thông tin thẻ không đi qua server
- Checkout session được tạo an toàn từ backend
- User authentication được kiểm tra trước khi thanh toán
- Payment confirmation được xác thực từ backend
- Stripe xử lý toàn bộ quá trình thanh toán

## Error Handling
- Network errors
- Payment failures
- Authentication errors
- Invalid card information
- Backend service errors

## Future Enhancements
1. ✅ **Real Stripe Integration** - Đã thay thế mock implementation bằng real Stripe API
2. ✅ **Webhook Support** - Đã implement xử lý Stripe webhooks cho payment events
3. **Subscription Management** - UI để quản lý subscription
4. **Payment History** - Hiển thị lịch sử thanh toán
5. **Multiple Payment Methods** - Hỗ trợ thêm PayPal, Apple Pay, Google Pay
6. **Stripe Customer Portal** - Tích hợp Stripe Customer Portal để quản lý subscription
7. **Subscription Billing** - Hỗ trợ recurring billing cho monthly/yearly plans

## Dependencies
### Frontend
- `@stripe/stripe-js`: ^7.1.0
- `@angular/common`: ^17.3.0
- `@angular/forms`: ^17.3.0
- `@angular/router`: ^17.3.0

### Backend
- Spring Boot 2.x
- Stripe Java SDK (cần thêm vào pom.xml)
- Spring Data JPA
- Spring Security

## Notes
- ✅ Backend đã sử dụng Stripe API thực tế (không còn mock)
- ✅ Stripe Java SDK đã được thêm vào dependencies
- ✅ Webhook handler đã được implement
- ✅ Cấu hình Stripe keys đã được thêm vào application.yml
- ✅ Frontend đã được cập nhật để xử lý API response format thực tế
- ✅ Error handling và success messages đã được cải thiện
- ✅ Status code handling cho các trường hợp lỗi khác nhau
- Stripe Checkout tự động xử lý mobile responsive
- Không cần tạo form thanh toán riêng, Stripe cung cấp UI hoàn chỉnh
- Cần cấu hình webhook secret key thực tế từ Stripe Dashboard
- Cần cấu hình webhook endpoint URL trong Stripe Dashboard
