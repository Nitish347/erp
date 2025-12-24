# Homework Submission (`/submissions`)

| Method | Endpoint     | Description       | Request Body                                                                     |
| :----- | :----------- | :---------------- | :------------------------------------------------------------------------------- |
| POST   | `/`          | Submit Homework   | `{ "homeworkId": "id", "content": "Here is my work", "attachments": ["link1"] }` |
| GET    | `/`          | List Submissions  | -                                                                                |
| PUT    | `/:id`       | Update Submission | `{ "content": "Updated work" }`                                                  |
| POST   | `/:id/grade` | Grade Submission  | `{ "marksObtained": 10, "feedback": "Good job" }`                                |

## cURL Examples

### Submit Homework

```bash
curl -X POST http://localhost:3000/api/v1/submissions \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "homeworkId": "replace_with_homework_id",
    "content": "This is my homework submission.",
    "attachments": ["https://example.com/file.pdf"]
  }'
```

### List Submissions

```bash
curl -X GET http://localhost:3000/api/v1/submissions \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Update Submission

```bash
curl -X PUT http://localhost:3000/api/v1/submissions/replace_with_id \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Updated homework content."
  }'
```

### Grade Submission

```bash
curl -X POST http://localhost:3000/api/v1/submissions/replace_with_id/grade \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "marksObtained": 10,
    "feedback": "Excellent work!"
  }'
```
