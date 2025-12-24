# Teacher (`/teachers`)

| Method | Endpoint               | Description           | Request Body                                                                                                                                       |
| :----- | :--------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | `/`                    | Create Teacher        | `{ "firstName": "Teacher", "lastName": "Name", "email": "teacher@school.com", "password": "pass", "institute": "admin_id", "department": "Math" }` |
| GET    | `/`                    | List Teachers         | -                                                                                                                                                  |
| GET    | `/:id`                 | Get Teacher by ID     | -                                                                                                                                                  |
| PATCH  | `/:id`                 | Update Teacher        | `{ "firstName": "New Name", "department": "Science" }` (Partial fields)                                                                            |
| DELETE | `/:id`                 | Delete Teacher        | -                                                                                                                                                  |
| GET    | `/students`            | Get Assigned Students | -                                                                                                                                                  |
| GET    | `/students/:studentId` | Get Specific Student  | -                                                                                                                                                  |

## cURL Examples

### Create Teacher (Admin)

```bash
curl -X POST http://localhost:3000/api/v1/teachers \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Teacher",
    "lastName": "Name",
    "email": "teacher@school.com",
    "password": "password123",
    "institute": "replace_with_institute_id",
    "department": "Science"
  }'
```

### List Teachers

```bash
curl -X GET http://localhost:3000/api/v1/teachers \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Get Teacher by ID

```bash
curl -X GET http://localhost:3000/api/v1/teachers/replace_with_id \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Update Teacher

```bash
curl -X PATCH http://localhost:3000/api/v1/teachers/replace_with_id \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "department": "Mathematics"
  }'
```

### Delete Teacher

```bash
curl -X DELETE http://localhost:3000/api/v1/teachers/replace_with_id \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Get Assigned Students

```bash
curl -X GET http://localhost:3000/api/v1/teachers/students \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Get Specific Student

```bash
curl -X GET http://localhost:3000/api/v1/teachers/students/replace_with_student_id \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```
