# Authentication API

Base URL: `/api/v1/auth`

## Register

### Register Admin

- **URL**: `/register/admin`
- **Method**: `POST`
- **Description**: Register a new admin.
- **Body**:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "admin@example.com",
  "password": "password123",
  "instituteName": "My Institute"
}
```

### Register Institute (Alias for Admin)

- **URL**: `/register/institute`
- **Method**: `POST`
- **Description**: Register a new institute.
- **Body**:

```json
{
  "firstName": "Admin",
  "lastName": "User",
  "email": "institute@example.com",
  "password": "password123",
  "instituteName": "Tech Academy"
}
```

### Register Student

- **URL**: `/register/student`
- **Method**: `POST`
- **Description**: Register a new student.
- **Body**:

```json
{
  "firstName": "Student",
  "lastName": "One",
  "email": "student@example.com",
  "password": "password123",
  "studentId": "STU001",
  "instituteId": "mongoIdOfInstitute"
}
```

### Register Teacher

- **URL**: `/register/teacher`
- **Method**: `POST`
- **Description**: Register a new teacher.
- **Body**:

```json
{
  "firstName": "Teacher",
  "lastName": "One",
  "email": "teacher@example.com",
  "password": "password123",
  "employeeId": "TCH001",
  "instituteId": "mongoIdOfInstitute"
}
```

## Login

### Login Admin

- **URL**: `/login/admin`
- **Method**: `POST`
- **Description**: Login for admins.
- **Body**:

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

### Login Institute

- **URL**: `/login/institute`
- **Method**: `POST`
- **Description**: Login for institutes.
- **Body**:

```json
{
  "email": "institute@example.com",
  "password": "password123"
}
```

### Login Teacher

- **URL**: `/login/teacher`
- **Method**: `POST`
- **Description**: Login for teachers.
- **Body**:

```json
{
  "email": "teacher@example.com",
  "password": "password123"
}
```

### Login Student

- **URL**: `/login/student`
- **Method**: `POST`
- **Description**: Login for students.
- **Body**:

```json
{
  "email": "student@example.com",
  "password": "password123"
}
```

## OTP

### Verify OTP

- **URL**: `/verify-otp`
- **Method**: `POST`
- **Description**: Verify OTP for email verification.
- **Body**:

```json
{
  "email": "user@example.com",
  "otp": "123456",
  "role": "admin"
}
```

_Role options: 'admin', 'student', 'teacher'_

### Resend OTP

- **URL**: `/resend-otp`
- **Method**: `POST`
- **Description**: Resend OTP.
- **Body**:

```json
{
  "email": "user@example.com",
  "role": "admin"
}
```
