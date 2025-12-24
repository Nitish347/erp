# Authentication (`/auth`)

| Method | Endpoint            | Description                      | Request Body                                                                                                                                                                                                                                    |
| :----- | :------------------ | :------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | `/register/admin`   | Register a new Admin (Institute) | ` { "firstName": "John", "lastName": "Doe", "email": "admin@example.com", "password": "password123", "instituteName": "My Institute", "address": "123 Main St", "city": "City", "state": "State", "pincode": "123456", "phone": "1234567890" }` |
| POST   | `/register/teacher` | Register a new Teacher           | `{ "firstName": "Jane", "lastName": "Doe", "email": "teacher@example.com", "password": "password123", "phone": "1234567890", "department": "Science", "hireDate": "2023-01-01" }`                                                               |
| POST   | `/register/student` | Register a new Student           | `{ "firstName": "Student", "lastName": "Name", "email": "student@example.com", "password": "password123", "phone": "1234567890", "enrollmentNumber": "STU001", "class": "10", "section": "A", "dateOfBirth": "2010-01-01" }`                    |
| POST   | `/login/admin`      | Login as Admin                   | `{ "email": "admin@example.com", "password": "password123" }`                                                                                                                                                                                   |
| POST   | `/login/teacher`    | Login as Teacher                 | `{ "email": "teacher@example.com", "password": "password123" }`                                                                                                                                                                                 |
| POST   | `/login/student`    | Login as Student                 | `{ "email": "student@example.com", "password": "password123" }`                                                                                                                                                                                 |
| POST   | `/verify-otp`       | Verify OTP                       | `{ "userId": "user_id_here", "otp": "4444", "role": "admin" \| "teacher" \| "student" }`                                                                                                                                                        |
| POST   | `/resend-otp`       | Resend OTP                       | `{ "userId": "user_id_here", "role": "admin" \| "teacher" \| "student" }`                                                                                                                                                                       |

## cURL Examples

### Register Admin

```bash
curl -X POST http://localhost:3000/api/v1/auth/register/admin \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "admin@example.com",
    "password": "password123",
    "instituteName": "My Institute",
    "address": "123 Main St",
    "city": "City",
    "state": "State",
    "pincode": "123456",
    "phone": "1234567890"
  }'
```

### Register Teacher

```bash
curl -X POST http://localhost:3000/api/v1/auth/register/teacher \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "teacher@example.com",
    "password": "password123",
    "phone": "1234567890",
    "department": "Science",
    "hireDate": "2023-01-01"
  }'
```

### Register Student

```bash
curl -X POST http://localhost:3000/api/v1/auth/register/student \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Student",
    "lastName": "Name",
    "email": "student@example.com",
    "password": "password123",
    "phone": "1234567890",
    "enrollmentNumber": "STU001",
    "class": "10",
    "section": "A",
    "dateOfBirth": "2010-01-01"
  }'
```

### Login Admin

```bash
curl -X POST http://localhost:3000/api/v1/auth/login/admin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123"
  }'
```

### Login Teacher

```bash
curl -X POST http://localhost:3000/api/v1/auth/login/teacher \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teacher@example.com",
    "password": "password123"
  }'
```

### Login Student

```bash
curl -X POST http://localhost:3000/api/v1/auth/login/student \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@example.com",
    "password": "password123"
  }'
```

### Verify OTP

```bash
curl -X POST http://localhost:3000/api/v1/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "replace_with_user_id",
    "otp": "123456",
    "role": "admin"
  }'
```

### Resend OTP

```bash
curl -X POST http://localhost:3000/api/v1/auth/resend-otp \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "replace_with_user_id",
    "role": "admin"
  }'
```
