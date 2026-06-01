# FixEngine24Seven
A complete offline service booking platform using HTML, CSS, JavaScript, and IndexedDB.

## 🚀 Features

### Authentication
- Registration
- Login
- Forgot password
- Password hashing (SHA-256)
- Role-based redirect
- Session saved in browser

### User Dashboard
- Book services
- Booking history
- Offline payments
- Notifications
- AI Chatbot
- Profile update

### Serviceman Dashboard
- Toggle availability
- See assigned jobs
- Complete jobs
- Notifications

### Admin Dashboard
- View total users
- View total servicemen
- View total bookings
- Add servicemen
- View all bookings
- View all notifications

## 📦 IndexedDB Tables
- users
- servicemen
- bookings
- notifications
- payments

Default admin login:
- Username: admin
- Password: admin123

## 🤖 AI Chatbot
- Offline rule-based assistant

## 🎨 UI / Branding
- Premium UI
- Responsive design
- Logo rule:
  - White background → newlogo.png
  - Colored background → logo1.png

## 📁 Folder Structure

FixEngine24Seven/
├── index.html
├── login.html
├── register.html
├── forgot_password.html
├── dashboard_user.html
├── dashboard_serviceman.html
├── dashboard_admin.html
├── offline_payment.html
├── chatbot.html
├── service_list.html
├── bookings.html
│
├── static/
│   ├── css/
│   │   ├── auth.css
│   │   ├── dashboard.css
│   │   ├── serviceman.css
│   │   ├── admin.css
│   │   ├── payment.css
│   │   ├── chatbot.css
│   │
│   ├── js/
│   │   ├── db.js
│   │   ├── session.js
│   │   ├── auth.js
│   │   ├── booking.js
│   │   ├── user.js
│   │   ├── serviceman.js
│   │   ├── admin.js
│   │   ├── notifications.js
│   │   ├── chatbot.js
│   │   ├── payment.js
│   │
│   └── images/
│       ├── your project images...
