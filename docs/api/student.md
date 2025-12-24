# Student (`/students`)

| Method | Endpoint | Description       | Request Body                                                                                                                                                                           |
| :----- | :------- | :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | `/`      | Create Student    | `{ "firstName": "Student", "lastName": "Name", "email": "student@school.com", "password": "pass", "institute": "admin_id", "enrollmentNumber": "123", "class": "10", "section": "A" }` |
| GET    | `/`      | List Students     | -                                                                                                                                                                                      |
| GET    | `/:id`   | Get Student by ID | -                                                                                                                                                                                      |
| PATCH  | `/:id`   | Update Student    | `{ "firstName": "New Name", "class": "11" }` (Partial fields)                                                                                                                          |
| DELETE | `/:id`   | Delete Student    | -                                                                                                                                                                                      |

## cURL Examples

### Create Student (Admin)

```bash
curl -X POST http://localhost:3000/api/v1/students \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Student",
    "lastName": "Name",
    "email": "student@school.com",
    "password": "password123",
    "institute": "replace_with_institute_id",
    "enrollmentNumber": "STU1234",
    "class": "10",
    "section": "A"
  }'
```

### List Students

```bash
curl -X GET http://localhost:3000/api/v1/students \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Get Student by ID

```bash
curl -X GET http://localhost:3000/api/v1/students/replace_with_id \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Update Student

```bash
curl -X PATCH http://localhost:3000/api/v1/students/replace_with_id \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Updated Name"
  }'
```

### Delete Student

```bash
curl -X DELETE http://localhost:3000/api/v1/students/replace_with_id \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```
