# Class (`/classes`)

| Method | Endpoint | Description     | Request Body                                                                                                                     |
| :----- | :------- | :-------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| POST   | `/`      | Create Class    | `{ "name": "Class 10", "grade": "10", "sections": ["A", "B"], "maxStudents": 40, "instituteId": "admin_id", "teacherId": "id" }` |
| GET    | `/`      | List Classes    | -                                                                                                                                |
| GET    | `/:id`   | Get Class by ID | -                                                                                                                                |
| PUT    | `/:id`   | Update Class    | `{ "name": "Class 10 Updated", "sections": ["A", "B", "C"] }`                                                                    |
| DELETE | `/:id`   | Delete Class    | -                                                                                                                                |

## cURL Examples

### Create Class

```bash
curl -X POST http://localhost:3000/api/v1/classes \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Class 10",
    "grade": "10",
    "sections": ["A", "B"],
    "maxStudents": 40,
    "instituteId": "replace_with_institute_id",
    "teacherId": "replace_with_teacher_id"
  }'
```

### List Classes

```bash
curl -X GET http://localhost:3000/api/v1/classes \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Get Class by ID

```bash
curl -X GET http://localhost:3000/api/v1/classes/replace_with_id \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Update Class

```bash
curl -X PUT http://localhost:3000/api/v1/classes/replace_with_id \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Class 10 Updated",
    "sections": ["A", "B", "C"]
  }'
```

### Delete Class

```bash
curl -X DELETE http://localhost:3000/api/v1/classes/replace_with_id \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```
