# Exam (`/exams`)

| Method | Endpoint | Description | Request Body                                                                                                                                |
| :----- | :------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| POST   | `/`      | Create Exam | `{ "name": "Midterm", "subject": "Math", "date": "2023-11-15", "startTime": "09:00", "duration": 120, "classId": "id", "totalMarks": 100 }` |
| GET    | `/`      | List Exams  | -                                                                                                                                           |
| GET    | `/:id`   | Get Exam    | -                                                                                                                                           |
| PUT    | `/:id`   | Update Exam | `{ "date": "2023-11-16" }`                                                                                                                  |
| DELETE | `/:id`   | Delete Exam | -                                                                                                                                           |

## cURL Examples

### Create Exam

```bash
curl -X POST http://localhost:3000/api/v1/exams \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Midterm Exam",
    "subject": "Mathematics",
    "date": "2023-11-15",
    "startTime": "09:00",
    "duration": 120,
    "classId": "replace_with_class_id",
    "totalMarks": 100
  }'
```

### List Exams

```bash
curl -X GET http://localhost:3000/api/v1/exams \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Get Exam by ID

```bash
curl -X GET http://localhost:3000/api/v1/exams/replace_with_id \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Update Exam

```bash
curl -X PUT http://localhost:3000/api/v1/exams/replace_with_id \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2023-11-16",
    "duration": 150
  }'
```

### Delete Exam

```bash
curl -X DELETE http://localhost:3000/api/v1/exams/replace_with_id \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```
