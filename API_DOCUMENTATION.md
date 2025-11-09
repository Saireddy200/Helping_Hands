# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Include JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Auth Endpoints

### 1. Register
**POST** `/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "donor" // or "receiver"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "donor"
  }
}
```

---

### 2. Login
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** Same as register

---

### 3. Forgot Password
**POST** `/auth/forgot-password`

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset email sent"
}
```

---

### 4. Reset Password
**PUT** `/auth/reset-password`

**Request Body:**
```json
{
  "token": "reset_token_from_email",
  "newPassword": "newpassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset successful"
}
```

---

### 5. Get Profile
**GET** `/auth/profile`

**Auth Required:** Yes

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "donor",
    "phone": "1234567890",
    "location": "New York",
    "bio": "I love helping people"
  }
}
```

---

### 6. Update Profile
**PUT** `/auth/profile`

**Auth Required:** Yes

**Request Body:**
```json
{
  "name": "John Doe",
  "phone": "1234567890",
  "location": "New York",
  "bio": "I love helping people"
}
```

**Response:** Updated user object

---

## Post Endpoints

### 1. Get All Posts
**GET** `/posts`

**Query Parameters:**
```
?category=medical&location=New York&search=help&status=active
```

**Response:**
```json
{
  "success": true,
  "count": 10,
  "posts": [
    {
      "id": "post_id",
      "title": "Help for Medical Emergency",
      "description": "My father needs surgery",
      "image": "/uploads/image.jpg",
      "requiredAmount": 5000,
      "collectedAmount": 2000,
      "category": "medical",
      "location": "New York",
      "status": "active",
      "createdBy": {
        "id": "user_id",
        "name": "Jane Receiver",
        "email": "jane@example.com"
      },
      "donors": ["donor_id_1", "donor_id_2"],
      "createdAt": "2024-10-17T10:00:00Z"
    }
  ]
}
```

---

### 2. Get Single Post
**GET** `/posts/:id`

**Response:** Single post object (same structure as above)

---

### 3. Create Post
**POST** `/posts`

**Auth Required:** Yes

**Content-Type:** `multipart/form-data`

**Form Data:**
```
title: "Help for Medical Emergency"
description: "My father needs surgery"
requiredAmount: 5000
category: "medical"
location: "New York"
image: <file>
```

**Response:**
```json
{
  "success": true,
  "post": { /* post object */ }
}
```

---

### 4. Update Post
**PUT** `/posts/:id`

**Auth Required:** Yes

**Content-Type:** `multipart/form-data`

**Form Data:** (same as create, all fields optional)

**Response:** Updated post object

---

### 5. Delete Post
**DELETE** `/posts/:id`

**Auth Required:** Yes

**Response:**
```json
{
  "success": true,
  "message": "Post deleted successfully"
}
```

---

### 6. Get User Posts
**GET** `/posts/user/my-posts`

**Auth Required:** Yes

**Response:** Array of user's posts

---

## Donation Endpoints

### 1. Create Donation
**POST** `/donations`

**Auth Required:** Yes

**Request Body:**
```json
{
  "postId": "post_id",
  "amount": 100
}
```

**Response:**
```json
{
  "success": true,
  "message": "Donation created successfully",
  "donation": {
    "id": "donation_id",
    "donorId": {
      "id": "user_id",
      "name": "John Donor",
      "email": "john@example.com"
    },
    "postId": {
      "id": "post_id",
      "title": "Help for Medical Emergency"
    },
    "amount": 100,
    "transactionId": "TXN-1234567890",
    "status": "completed",
    "date": "2024-10-17T10:00:00Z"
  }
}
```

---

### 2. Get All Donations
**GET** `/donations`

**Response:** Array of all donations

---

### 3. Get User Donations
**GET** `/donations/user/:userId`

**Response:** Array of user's donations

---

### 4. Get Post Donations
**GET** `/donations/post/:postId`

**Response:** Array of donations for a specific post

---

### 5. Get Donation Statistics
**GET** `/donations/stats/all`

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalDonations": 50,
    "totalAmount": 5000,
    "uniqueDonors": 25,
    "completedCauses": 5
  }
}
```

---

## Contact Endpoints

### 1. Send Contact Message
**POST** `/contact`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Question about platform",
  "message": "How does the platform work?"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully",
  "data": { /* message object */ }
}
```

---

### 2. Get All Messages (Admin Only)
**GET** `/contact`

**Auth Required:** Yes (Admin role)

**Response:** Array of all messages

---

### 3. Get Single Message (Admin Only)
**GET** `/contact/:id`

**Auth Required:** Yes (Admin role)

**Response:** Single message object

---

### 4. Update Message Status (Admin Only)
**PUT** `/contact/:id`

**Auth Required:** Yes (Admin role)

**Request Body:**
```json
{
  "status": "replied",
  "reply": "Thank you for your message..."
}
```

**Response:** Updated message object

---

### 5. Delete Message (Admin Only)
**DELETE** `/contact/:id`

**Auth Required:** Yes (Admin role)

**Response:**
```json
{
  "success": true,
  "message": "Message deleted successfully"
}
```

---

## Admin Endpoints

### 1. Get Platform Statistics
**GET** `/admin/stats`

**Auth Required:** Yes (Admin role)

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalUsers": 100,
    "totalPosts": 50,
    "activePosts": 30,
    "completedPosts": 5,
    "totalDonations": 500,
    "totalAmount": 50000,
    "uniqueDonors": 250,
    "causesCreators": 50
  }
}
```

---

### 2. Get All Users
**GET** `/admin/users`

**Auth Required:** Yes (Admin role)

**Response:** Array of all users (without passwords)

---

### 3. Delete User
**DELETE** `/admin/users/:id`

**Auth Required:** Yes (Admin role)

**Response:**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

### 4. Get All Posts (Admin)
**GET** `/admin/posts`

**Auth Required:** Yes (Admin role)

**Response:** Array of all posts

---

### 5. Delete Post (Admin)
**DELETE** `/admin/posts/:id`

**Auth Required:** Yes (Admin role)

**Response:** Success message

---

### 6. Get All Donations (Admin)
**GET** `/admin/donations`

**Auth Required:** Yes (Admin role)

**Response:** Array of all donations

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "message": "No token, authorization denied"
}
```

### 403 Forbidden
```json
{
  "message": "User role not authorized to access this route"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Something went wrong",
  "error": "Error details"
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## Categories

- `medical` - Medical emergencies and treatments
- `education` - Educational needs
- `emergency` - Emergency situations
- `community` - Community projects
- `other` - Other causes

---

## Roles

- `donor` - Can donate and view causes
- `receiver` - Can create posts and receive donations
- `admin` - Full platform access

---

## Examples

### Example: Create a Donation Post
```bash
curl -X POST http://localhost:5000/api/posts \
  -H "Authorization: Bearer your_token" \
  -F "title=Help for Medical Emergency" \
  -F "description=My father needs surgery" \
  -F "requiredAmount=5000" \
  -F "category=medical" \
  -F "location=New York" \
  -F "image=@path/to/image.jpg"
```

### Example: Make a Donation
```bash
curl -X POST http://localhost:5000/api/donations \
  -H "Authorization: Bearer your_token" \
  -H "Content-Type: application/json" \
  -d '{
    "postId": "post_id",
    "amount": 100
  }'
```

### Example: Get Filtered Posts
```bash
curl "http://localhost:5000/api/posts?category=medical&location=New%20York"
```

---

**Last Updated:** October 17, 2024
