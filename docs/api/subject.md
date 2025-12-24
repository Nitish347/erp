# Subject (`/subjects`)

| Method | Endpoint | Description       | Request Body                                                                                                                               |
| :----- | :------- | :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | `/`      | Create Subject    | `{ "name": "Mathematics", "code": "MATH101", "description": "Core Math", "classId": "class_id", "instituteId": "admin_id", "credits": 4 }` |
| GET    | `/`      | List Subjects     | -                                                                                                                                          |
| GET    | `/:id`   | Get Subject by ID | -                                                                                                                                          |
| PUT    | `/:id`   | Update Subject    | `{ "name": "Advanced Math", "credits": 5 }`                                                                                                |
| DELETE | `/:id`   | Delete Subject    | -                                                                                                                                          |

## cURL Examples

### Create Subject

```bash
curl -X POST http://localhost:3000/api/v1/subjects \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mathematics",
    "code": "MATH101",
    "description": "Core Math",
    "classId": "replace_with_class_id",
    "instituteId": "replace_with_institute_id",
    "credits": 4
  }'
```

### List Subjects

```bash
curl -X GET http://localhost:3000/api/v1/subjects \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Get Subject by ID

```bash
curl -X GET http://localhost:3000/api/v1/subjects/replace_with_id \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Update Subject

```bash
curl -X PUT http://localhost:3000/api/v1/subjects/replace_with_id \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Advanced Mathematics",
    "credits": 5
  }'
```

### Delete Subject

```bash
curl -X DELETE http://localhost:3000/api/v1/subjects/replace_with_id \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```
