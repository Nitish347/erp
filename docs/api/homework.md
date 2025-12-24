# Homework (`/homework`)

| Method | Endpoint | Description     | Request Body                                                                                                                                                 |
| :----- | :------- | :-------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | `/`      | Create Homework | `{ "title": "Math Homework", "description": "Solve ch 1", "subject": "Math", "classId": "id", "section": "A", "dueDate": "2023-11-01", "priority": "high" }` |
| GET    | `/`      | List Homework   | -                                                                                                                                                            |
| GET    | `/:id`   | Get Homework    | -                                                                                                                                                            |
| PUT    | `/:id`   | Update Homework | `{ "title": "Updated Title", "dueDate": "2023-11-02" }`                                                                                                      |
| DELETE | `/:id`   | Delete Homework | -                                                                                                                                                            |

## cURL Examples

### Create Homework

```bash
curl -X POST http://localhost:3000/api/v1/homework \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Math Homework",
    "description": "Complete Chapter 1 Exercises",
    "subject": "Mathematics",
    "classId": "replace_with_class_id",
    "section": "A",
    "dueDate": "2023-11-01",
    "priority": "high"
  }'
```

### List Homework

```bash
curl -X GET http://localhost:3000/api/v1/homework \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Get Homework by ID

```bash
curl -X GET http://localhost:3000/api/v1/homework/replace_with_id \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Update Homework

```bash
curl -X PUT http://localhost:3000/api/v1/homework/replace_with_id \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Homework Title",
    "dueDate": "2023-11-02"
  }'
```

### Delete Homework

```bash
curl -X DELETE http://localhost:3000/api/v1/homework/replace_with_id \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```
